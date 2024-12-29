import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { AuthRepository } from '../../../src/modules/auth/auth.repository';
import { UserRepository } from '../../../src/modules/user/user.repository';
import { ConfigUtil } from '../../../src/modules/utils/config.utils';
import { User } from '../../../src/modules/user/entitys/user.entity';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: AuthRepository;
  let userRepository: UserRepository;
  let jwtService: JwtService;
  let configUtil: ConfigUtil;

  const mockUserRepository = {
    findUserByEmail: jest.fn(),
    activeUser: jest.fn(),
    updateUser: jest.fn(),
  };

  const mockAuthRepository = {
    createTokenHistory: jest.fn(),
    findActiveToken: jest.fn(),
    desactivateToken: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
  };

  const mockConfigUtil = {
    frontUrl: 'http://localhost',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: mockAuthRepository },
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigUtil, useValue: mockConfigUtil },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
    configUtil = module.get<ConfigUtil>(ConfigUtil);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return a token when credentials are valid', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password123', 10);
      user.isActive = true;

      mockUserRepository.findUserByEmail.mockResolvedValue(user);
      mockJwtService.signAsync.mockResolvedValue('token');

      const result = await service.signIn('test@example.com', 'password123');

      expect(result).toBe('token');
      expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockJwtService.signAsync).toHaveBeenCalled();
    });

    it('should throw an error if user is not active', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password123', 10);
      user.isActive = false;

      mockUserRepository.findUserByEmail.mockResolvedValue(user);

      const result = await service.signIn('test@example.com', 'password123');

      expect(result).toBe('User Not Active');
    });

    it('should throw an error if password is incorrect', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password123', 10);

      mockUserRepository.findUserByEmail.mockResolvedValue(user);

      await expect(service.signIn('test@example.com', 'wrongpassword'))
        .rejects
        .toThrowError(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
    });
  });

  // describe('refreshToken', () => {
  //   it('should return a new token when refresh token is valid', async () => {
  //     const user = { id: 'user-id', email: 'test@example.com' };
  //     mockJwtService.verifyAsync.mockResolvedValue({ email: 'test@example.com' });
  //     mockJwtService.signAsync.mockResolvedValue('new-token');

  //     const result = await service.refreshToken('refreshToken', user as any);

  //     expect(result).toBe('new-token');
  //     expect(mockJwtService.verifyAsync).toHaveBeenCalledWith('refreshToken');
  //     expect(mockJwtService.signAsync).toHaveBeenCalled();
  //   });

  //   it('should throw an error if refresh token is invalid', async () => {
  //     mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

  //     await expect(service.refreshToken('invalid-token', { id: 'user-id' } as any))
  //       .rejects
  //       .toThrowError(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
  //   });
  // });

  // describe('resetPassword', () => {
  //   it('should send a reset password email if user exists', async () => {
  //     const user = new User();
  //     user.email = 'test@example.com';
  //     user.name = 'Test User';

  //     mockUserRepository.findUserByEmail.mockResolvedValue(user);
  //     mockJwtService.signAsync.mockResolvedValue('reset-token');
  //     mockAuthRepository.createTokenHistory.mockResolvedValue(undefined);

  //     const result = await service.resetPassword('test@example.com');

  //     expect(result).toBe(
  //       'ResetPasswordEmailSendOk { date: "2024-12-29", name: "Test", email: "test@example.com", frontUrl: "http://localhost/reset-password?tokenEmail=reset-token&email=test@example.com" }',
  //     );
  //     expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith('test@example.com');
  //   });

  //   it('should throw an error if user does not exist', async () => {
  //     mockUserRepository.findUserByEmail.mockResolvedValue(null);

  //     await expect(service.resetPassword('test@example.com'))
  //       .rejects
  //       .toThrowError(new HttpException('UserNotExist', HttpStatus.INTERNAL_SERVER_ERROR));
  //   });
  // });
});
