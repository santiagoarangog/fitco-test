import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigUtil } from '../utils/config.utils';
import { generateGuid, getDateNowEmail } from 'src/common/utils/utils';
import { User } from '../user/entitys/user.entity';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';
import { UserDto } from '../user/dto/user.dto';

/**
 * Servicio de Autenticación del usuario
 * @class AuthService
 * @description Maneja todas las operaciones relacionadas con la autenticación del usuario
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configUtil: ConfigUtil,
  ) {}

  /**
   * Autenticación de usuario
   * @param {string} username - Username o Email del usuario
   * @param {string} pass - Contraseña del usuario
   * @returns {Promise<String>} Token del usuario
   * @throws {NotFoundException} Usuario no autorizado
   * @throws {DatabaseException} Error de conexión DB
   */
  async signIn(username: string, pass: string): Promise<String> {
    const user = await this.userRepository.findUserByEmail(username);

    if (user && (await bcrypt.compare(pass, user.password))) {
      if (user.isActive) {
        return await this.generateToken(user);
      } else {
        return 'User Not Active';
      }
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  /**
   * Actualiza el token de autenticación
   * @param {string} refreshToken - Username o Email del usuario
   * @param {UserDto} user - Contraseña del usuario
   * @returns {Promise<String>} Token del usuario
   * @throws {NotFoundException} Usuario no autorizado
   * @throws {DatabaseException} Error de conexión DB
   */
  async refreshToken(refreshToken: string, user: UserDto): Promise<String> {
    try {
      const payload = this.jwtService.verifyAsync(refreshToken);
      console.log(payload);

      if (payload) {
        return await this.generateTokenNew(user);
      }
    } catch (err) {
      this.logger.error(err);
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  /**
   * Actualiza el token de autenticación
   * @param {string} email - Correo electrónico del usuario
   * @returns {Promise<String>} ResetPasswordEmailSendOk
   * @throws {NotFoundException} UserNotExist
   * @throws {DatabaseException} Error de conexión DB
   */
  async resetPassword(email: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new HttpException('UserNotExist', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const token = await this.generateToken(user);
    await this.authRepository.createTokenHistory(email, token);

    const data = {
      date: getDateNowEmail(),
      name: user.name.split(' ')[0],
      email: user.email,
      frontUrl: `${this.configUtil.frontUrl}/reset-password?tokenEmail=${token}&email=${email}`,
    };

    return `ResetPasswordEmailSendOk ${data}`;
  }

  /**
   * Valida el token suministrado
   * @param {string} email - Correo electrónico del usuario
   * @param {string} token - Token de autenticación
   * @returns {Promise<String>} ResetPasswordEmailSendOk
   * @throws {NotFoundException} InvalidToken
   * @throws {DatabaseException} Error de conexión DB
   */
  async validateToken(email: string, token: string): Promise<string> {
    const activeToken = await this.authRepository.findActiveToken(email, token);

    if (!activeToken) {
      throw new HttpException('InvalidToken', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const user = await this.userRepository.findUserByEmail(email);
    await this.authRepository.desactivateToken(activeToken);

    const newToken = await this.generateToken(user);
    await this.userRepository.activeUser(user.uuid, true);

    return newToken;
  }

  /**
   * Valida el token suministrado
   * @param {string} email - Correo electrónico del usuario
   * @param {string} newPassword - Token de autenticación
   * @param {string} confirmPassword - Token de autenticación
   * @returns {Promise<String>} Retorna el token generado
   * @throws {NotFoundException} InvalidUser
   * @throws {DatabaseException} Error de conexión DB
   */
  async changePassword(
    email: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<string> {
    if (newPassword !== confirmPassword) {
      throw new HttpException(
        'InvalidPassword',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new HttpException('InvalidUser', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updateUser(user);

    const newToken = await this.generateToken(user);
    return newToken;
  }

  /**
   * Valida el token suministrado
   * @param {User} user - Información del usuario
   */
  async generateToken(user: User) {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.uuid,
    };
    return await this.jwtService.signAsync(payload);
  }

  /**
   * Genera un nuevo token de autenticación
   * @param {UserDto} user - Información del usuario
   */
  async generateTokenNew(user: UserDto) {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    };
    return await this.jwtService.signAsync(payload);
  }

  /**
   * Inicio de sesión con token desde email de confirmación
   * @param {string} email - Información del usuario
   * @param {string} tokenEmail - Información del usuario
   * @returns {Promise<String>} Retorna el token generado
   * @throws {NotFoundException} Unauthorized
   * @throws {DatabaseException} Error de conexión DB
   */
  async loginFromEmail(email: string, tokenEmail: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (user && tokenEmail === user.tokenEmail) {
      user.tokenEmail = null;
      await this.userRepository.updateUser(user);

      const token = await this.generateToken(user);
      return token;
    }

    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  /**
   * Inicio de sesión con token desde email de confirmación
   * @param {string} email - Información del usuario
   * @param {string} lang - Indica el idioma del correo
   * @returns {Promise<String>} Retorna mensaje de envío correcto del correo
   * @throws {NotFoundException} Unauthorized
   * @throws {DatabaseException} Error de conexión DB
   */
  async sendLoginEmail(email: string, lang: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new HttpException('UserNotExist', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const token = generateGuid();
    const data = {
      date: getDateNowEmail(),
      email: user.email,
      frontUrl: `${this.configUtil.frontUrl}/loading-sesion?lang=${lang}&tokenEmail=${token}&email=${email}`,
    };

    user.tokenEmail = token;
    await this.userRepository.updateUser(user);

    return `LogInEmailSendOk ${data} ${user.tokenEmail}`;
  }
}
