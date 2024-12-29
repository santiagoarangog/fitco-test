import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigUtil } from '../utils/config.utils';
import { generateGuid, getDateNowEmail } from 'src/common/utils/utils';
import { User } from '../user/entitys/user.entity';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configUtil: ConfigUtil,
  ) {}

  async signIn(username: string, pass: string) {
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

  async refreshToken(refreshToken: string, user: UserDto) {
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

  async resetPassword(email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new HttpException('UserNotExist', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const token = await this.generateToken(user);
    console.log(token);
    await this.authRepository.createTokenHistory(email, token);

    const data = {
      date: getDateNowEmail(),
      name: user.name.split(' ')[0],
      email: user.email,
      frontUrl: `${this.configUtil.frontUrl}/reset-password?tokenEmail=${token}&email=${email}`,
    };

    return `ResetPasswordEmailSendOk ${data}`;
  }

  async validateToken(email: string, token: string) {
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

  async changePassword(
    email: string,
    newPassword: string,
    confirmPassword: string,
  ) {
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

  async generateToken(user: User) {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.uuid,
    };
    return await this.jwtService.signAsync(payload);
  }

  async generateTokenNew(user: UserDto) {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    };
    return await this.jwtService.signAsync(payload);
  }

  async loginFromEmail(email: string, tokenEmail: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (user && tokenEmail === user.tokenEmail) {
      user.tokenEmail = null;
      await this.userRepository.updateUser(user);

      const token = await this.generateToken(user);
      return token;
    }

    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  async sendLoginEmail(email: string, lang: string) {
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
