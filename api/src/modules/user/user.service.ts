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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
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

  // async activeUser(id: string | unknown, active: boolean) {
  //     const existinguserId = id as unknown as Types.ObjectId;
  //     const user_id = new Types.ObjectId(existinguserId);
  //     let output: User;
  //     output = await this.UserModel.findByIdAndUpdate(user_id, {
  //         isActive: true,
  //     });
  //     if (!output) {
  //         throw new NotFoundException(`User with id ${id} not found`);
  //     }
  //     return { result: new ResponseDto(true, undefined, { user: output }) };
  // }

  // async sendEmailNewUser(
  //     email: string,
  //     lang: string,
  // ): Promise<{ result: ResponseDto<void> }> {
  //     const user = await this.UserModel.findOne({ email }).exec();
  //     if (!user) {
  //         throw new HttpException("UserNotExist", HttpStatus.INTERNAL_SERVER_ERROR);
  //     }

  //     const payload = {
  //         name: user.name,
  //         email: user.email,
  //         role: user.role,
  //         id: user.id,
  //         companyId: user.companyId,
  //         investType: user.investType,
  //     };
  //     const token = await this.jwtService.signAsync(payload);
  //     await this.TokenHistoryModel.create({ email, token });

  //     const data = {
  //         date: getDateNowEmail(),
  //         email: user.email,
  //         frontUrl:
  //             this.configUtil.frontUrl +
  //             `/reset-password?lang=${lang}&tokenEmail=${token}&email=${email}&newUser=true`,
  //     };

  //     let notification = new SentNotificationDto();
  //     notification.lang = "es";
  //     notification.templateName = "newUser";
  //     notification.email = user.email;
  //     notification.userId = user.id;
  //     notification.subject = "Alter5 - New user";
  //     notification.subjecType = NotificationLogSubject.NEWREGISTERUSER;
  //     notification.data = data;
  //     this.notificationLogService.sendEmailNotification(notification);

  //     const result = new ResponseDto<void>(true, "ResetPasswordEmailSendOk");
  //     return { result };
  // }
}
