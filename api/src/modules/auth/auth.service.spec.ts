import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigUtil } from '../utils/config.utils';
import { HttpStatus } from '@nestjs/common';

jest.mock('bcrypt');
jest.mock('fs');
jest.mock('handlebars');

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: AuthRepository;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: {
            createTokenHistory: jest.fn(),
            findActiveToken: jest.fn(),
            deactivateToken: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findUserByEmail: jest.fn(),
            activeUser: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: ConfigUtil,
          useValue: {
            frontUrl: 'http://localhost:3000',
            nodeEnv: 'development',
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return token when user is found and password matches', async () => {
      const user = {
        email: 'test@example.com',
        password: 'hashedpassword',
        isActive: true,
        uuid: '123',
        role: 'admin',
        name: 'Test User',
      };
      const signInDto = { username: 'test@example.com', pass: 'password' };

      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(user as any);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token123');

      const result = await authService.signIn(
        signInDto.username,
        signInDto.pass,
      );

      expect(result).toBe('token123');
    });

    it('should throw Unauthorized exception if user is not active', async () => {
      const user = {
        email: 'test@example.com',
        password: 'hashedpassword',
        isActive: false,
      };

      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(user as any);

      try {
        await authService.signIn('test@example.com', 'password');
      } catch (error) {
        expect(error.response).toBe('User Not Active');
        expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
      }
    });

    it('should throw Unauthorized exception if password does not match', async () => {
      const user = {
        email: 'test@example.com',
        password: 'hashedpassword',
        isActive: true,
      };

      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(user as any);

      try {
        await authService.signIn('test@example.com', 'wrongpassword');
      } catch (error) {
        expect(error.response).toBe('Unauthorized');
        expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
      }
    });
  });

  describe('resetPassword', () => {
    it('should send reset password email if user exists', async () => {
      const user = { email: 'test@example.com', name: 'Test User' };
      const resetPasswordDto = { email: 'test@example.com' };

      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(user as any);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token123');
      jest
        .spyOn(authRepository, 'createTokenHistory')
        .mockResolvedValue(undefined);

      const result = await authService.resetPassword(resetPasswordDto.email);

      expect(result).toBe(true);
    });

    it('should throw UserNotExist exception if user does not exist', async () => {
      const resetPasswordDto = { email: 'nonexistent@example.com' };

      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);

      try {
        await authService.resetPassword(resetPasswordDto.email);
      } catch (error) {
        expect(error.response).toBe('UserNotExist');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('validateToken', () => {
    it('should return new token if token is valid', async () => {
      const user = { email: 'test@example.com', uuid: '123', role: 'admin' };
      const validatetokenDto = { email: 'test@example.com', token: 'token123' };

      jest.spyOn(authRepository, 'findActiveToken').mockResolvedValue({
        email: 'test@example.com',
        token: 'token123',
      } as any);
      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(user as any);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('newToken123');

      const result = await authService.validateToken(
        validatetokenDto.email,
        validatetokenDto.token,
      );

      expect(result).toBe(true);
      expect(result).toBe('newToken123');
    });

    it('should throw InvalidToken exception if token is not found', async () => {
      const validatetokenDto = {
        email: 'test@example.com',
        token: 'invalidtoken',
      };

      jest.spyOn(authRepository, 'findActiveToken').mockResolvedValue(null);

      try {
        await authService.validateToken(
          validatetokenDto.email,
          validatetokenDto.token,
        );
      } catch (error) {
        expect(error.response).toBe('InvalidToken');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('changePassword', () => {
    it('should change password if new and confirm password match', async () => {
      const user = {
        email: 'test@example.com',
        uuid: '123',
        password: 'oldpassword',
      };
      const changePasswordDto = {
        email: 'test@example.com',
        password: 'newpassword',
        confirmPassword: 'newpassword',
      };

      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(user as any);
      jest.spyOn(userRepository, 'updateUser').mockResolvedValue(user as any);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('newToken123');

      const result = await authService.changePassword(
        changePasswordDto.email,
        changePasswordDto.password,
        changePasswordDto.confirmPassword,
      );

      expect(result).toBe(true);
      expect(result).toBe('newToken123');
    });

    it('should throw InvalidPassword exception if passwords do not match', async () => {
      const changePasswordDto = {
        email: 'test@example.com',
        password: 'newpassword',
        confirmPassword: 'differentpassword',
      };

      try {
        await authService.changePassword(
          changePasswordDto.email,
          changePasswordDto.password,
          changePasswordDto.confirmPassword,
        );
      } catch (error) {
        expect(error.response).toBe('InvalidPassword');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('loginFromEmail', () => {
    it('should return token if email and tokenEmail match', async () => {
      const user = { email: 'test@example.com', tokenEmail: 'token123' };
      const loginFromEmailDto = {
        email: 'test@example.com',
        tokenEmail: 'token123',
      };

      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(user as any);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token123');
      jest.spyOn(userRepository, 'updateUser').mockResolvedValue(user as any);

      const result = await authService.loginFromEmail(
        loginFromEmailDto.email,
        loginFromEmailDto.tokenEmail,
      );

      expect(result).toBe(true);
      expect(result).toBe('token123');
    });

    it('should throw Unauthorized exception if email and tokenEmail do not match', async () => {
      const user = { email: 'test@example.com', tokenEmail: 'token123' };
      const loginFromEmailDto = {
        email: 'test@example.com',
        tokenEmail: 'wrongtoken',
      };

      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(user as any);

      try {
        await authService.loginFromEmail(
          loginFromEmailDto.email,
          loginFromEmailDto.tokenEmail,
        );
      } catch (error) {
        expect(error.response).toBe('Unauthorized');
        expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
      }
    });
  });

  describe('sendLoginEmail', () => {
    it('should send login email if user exists', async () => {
      const user = { email: 'test@example.com' };
      const sendLoginEmailDto = { email: 'test@example.com', lang: 'en' };

      jest
        .spyOn(userRepository, 'findUserByEmail')
        .mockResolvedValue(user as any);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token123');
      jest.spyOn(userRepository, 'updateUser').mockResolvedValue(user as any);

      const result = await authService.sendLoginEmail(
        sendLoginEmailDto.email,
        sendLoginEmailDto.lang,
      );

      expect(result).toBe(true);
    });

    it('should throw UserNotExist exception if user does not exist', async () => {
      const sendLoginEmailDto = {
        email: 'nonexistent@example.com',
        lang: 'en',
      };

      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);

      try {
        await authService.sendLoginEmail(
          sendLoginEmailDto.email,
          sendLoginEmailDto.lang,
        );
      } catch (error) {
        expect(error.response).toBe('UserNotExist');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
