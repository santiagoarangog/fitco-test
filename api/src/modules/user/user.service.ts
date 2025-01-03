import { AuthRepository } from '../auth/auth.repository';
import { UserRepository } from './user.repository';
import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/common/services/hash.service';
import { User } from './entitys/user.entity';

/**
 * Servicio del usuario
 * @class UserService
 * @description Maneja todas las operaciones relacionadas con los usuarios del sistema
 */
@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @Inject(forwardRef(() => AuthRepository))
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Crear un nuevo usuario
   * @param {CreateUserDto} createUserDto - Información del usuario
   * @returns {Promise<User>} Información de los usuarios
   * @throws {NotFoundException} Indica el error al crear el usuario
   * @throws {DatabaseException} Error de conexión DB
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      if (createUserDto.password !== createUserDto.confirmPassword) {
        throw new BadRequestException('Las contraseñas no coinciden');
      }

      const existingUser = await this.userRepository.findUserByEmail(
        createUserDto.email,
      );
      if (existingUser) {
        throw new BadRequestException(
          'Este usuario ya se encuentra registrado',
        );
      }

      const hashedPassword = await this.hashService.hashPassword(
        createUserDto.password,
      );

      const newUser = await this.userRepository.createUser(
        createUserDto,
        hashedPassword,
      );

      const payload = {
        name: newUser.name,
        email: newUser.email,
      };

      const token = await this.jwtService.signAsync(payload);

      await this.authRepository.createTokenHistory(createUserDto.email, token);

      return newUser;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new HttpException(
        'Error al crear el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Listado de usuarios
   * @param {number} limit - Indica la cantidad de usuarios a mostrar
   * @param {number} offset - Indica la cantidad de usuarios a saltar
   * @returns {Promise<{items: Events[]; total: number}>} Información de los usuarios
   * @throws {NotFoundException} Error al listar los usuarios
   * @throws {DatabaseException} Error de conexión DB
   */
  async findAll(limit: number, offset: number): Promise<{ items: User[]; total: number; }> {
    return await this.userRepository.findAll(limit, offset);
  }

  /**
   * Retorna un usuario por su ID
   * @param {number} id - Indica la cantidad de usuarios a mostrar
   * @returns {Promise<User>} Información de los usuarios
   * @throws {NotFoundException} Error al crear el usuario
   * @throws {DatabaseException} Error de conexión DB
   */
  async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  /**
   * Actualiza la información del usuario
   * @param {number} id - ID de un usuario en particular
   * @param {UpdateUserDto} updateUserDto - Información del usuario
   * @returns {Promise<User>} Información de los usuarios
   * @throws {NotFoundException} User with id ${id} not found
   * @throws {NotFoundException} InvalidUserError
   * @throws {DatabaseException} Error de conexión DB
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      await this.userRepository.updateUser(updateUserDto);

      return await this.userRepository.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'InvalidUserError',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Eliminación de un usuario
   * @param {number} id - ID de un usuario en particular
   * @returns {Promise<void>} Retorna el usuario eliminado
   * @throws {NotFoundException} User with id ${id} not found
   * @throws {NotFoundException} El ID ingresado es incorrecto
   * @throws {DatabaseException} Error de conexión DB
   */
  async remove(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (existingUser) {
      throw new HttpException(
        'El ID ingresado es incorrecto',
        HttpStatus.CONFLICT,
      );
    }
    return await this.userRepository.deleteUserById(id);
  }
}
