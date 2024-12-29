import { Role } from '../../../src/common/enums/role.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/modules/user/user.service';
import { UserRepository } from '../../../src/modules/user/user.repository';
import { AuthRepository } from '../../../src/modules/auth/auth.repository';
import { HashService } from 'src/common/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../../../src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/modules/user/dto/update-user.dto';
import { User } from '../../../src/modules/user/entitys/user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let authRepository: AuthRepository;
  let hashService: HashService;
  let jwtService: JwtService;

  const mockUserRepository = {
    findUserByEmail: jest.fn(),
    createUser: jest.fn(),
    findById: jest.fn(),
    updateUser: jest.fn(),
    deleteUserById: jest.fn(),
  };

  const mockAuthRepository = {
    createTokenHistory: jest.fn(),
  };

  const mockHashService = {
    hashPassword: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },
        {
          provide: HashService,
          useValue: mockHashService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    authRepository = module.get<AuthRepository>(AuthRepository);
    hashService = module.get<HashService>(HashService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should throw an error if passwords do not match', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password321',
        role: Role.USER,
        phone: '1234567890',
      };

      await expect(userService.createUser(createUserDto)).rejects.toThrowError(
        new BadRequestException('Las contraseñas no coinciden'),
      );
    });

    it('should throw an error if the user already exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: Role.USER,
        phone: '1234567890',
      };

      mockUserRepository.findUserByEmail.mockResolvedValue({
        email: 'john@example.com',
        name: 'John Doe',
        uuid: '1',
      });

      await expect(userService.createUser(createUserDto)).rejects.toThrowError(
        new BadRequestException('Este usuario ya se encuentra registrado'),
      );
    });

    it('should create a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: Role.USER,
        phone: '1234567890',
      };

      const hashedPassword = 'hashedPassword';
      const newUser = { ...createUserDto, password: hashedPassword, uuid: '1' };
      const token = 'mockToken';

      mockUserRepository.findUserByEmail.mockResolvedValue(null);
      mockHashService.hashPassword.mockResolvedValue(hashedPassword);
      mockUserRepository.createUser.mockResolvedValue(newUser);
      mockJwtService.signAsync.mockResolvedValue(token);
      mockAuthRepository.createTokenHistory.mockResolvedValue(undefined);

      const result = await userService.createUser(createUserDto);

      expect(result).toEqual(newUser);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(createUserDto, hashedPassword);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        name: newUser.name,
        email: newUser.email,
      });
      expect(mockAuthRepository.createTokenHistory).toHaveBeenCalledWith(createUserDto.email, token);
    });
  });

  describe('update', () => {
    it('should throw an error if the user is not found', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(userService.update('1', updateUserDto)).rejects.toThrowError(
        new NotFoundException('InvalidUserError'),
      );
    });

    it('should update the user successfully', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };
      const updatedUser = { ...updateUserDto, uuid: '1' };
      mockUserRepository.findById.mockResolvedValue(updatedUser);
      mockUserRepository.updateUser.mockResolvedValue(undefined);
      mockUserRepository.findById.mockResolvedValue(updatedUser);

      const result = await userService.update('1', updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.updateUser).toHaveBeenCalledWith(updateUserDto);
    });
  });

  describe('remove', () => {
    it('should throw an error if the user ID is invalid', async () => {
      mockUserRepository.findById.mockResolvedValue({
        uuid: '1',
        email: 'john@example.com',
        name: 'John Doe',
      });

      await expect(userService.remove('1')).rejects.toThrowError(
        new HttpException('El ID ingresado es incorrecto', 409),
      );
    });

    it('should delete the user successfully', async () => {
      mockUserRepository.findById.mockResolvedValue(null);
      mockUserRepository.deleteUserById.mockResolvedValue(undefined);

      await expect(userService.remove('1')).resolves.not.toThrow();
      expect(mockUserRepository.deleteUserById).toHaveBeenCalledWith('1');
    });
  });
});
