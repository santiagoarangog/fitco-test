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

  async createUser(createUserDto: CreateUserDto) {
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

  async findAll(limit: number, offset: number) {
    return await this.userRepository.findAll(limit, offset);
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

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

  async remove(id: string) {
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
