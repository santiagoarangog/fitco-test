import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/modules/auth/auth.controller';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { SignInDto } from '../../../src/modules/auth/dto/sign-in.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

const authServiceMock = {
  signIn: jest.fn(),
  resetPassword: jest.fn(),
  validateToken: jest.fn(),
  refreshToken: jest.fn(),
  changePassword: jest.fn(),
  loginFromEmail: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {
    it('should return tokens on successful sign-in', async () => {
      const signInDto: SignInDto = { email: 'test@example.com', password: 'password' };
      const result = { accessToken: 'access_token', refreshToken: 'refresh_token' };
      authServiceMock.signIn.mockResolvedValue(result);

      expect(await authController.signIn(signInDto)).toBe(result);
    });

    it('should throw an error if login fails', async () => {
      const signInDto: SignInDto = { email: 'test@example.com', password: 'wrong_password' };
      authServiceMock.signIn.mockRejectedValue(new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED));

      try {
        await authController.signIn(signInDto);
      } catch (e) {
        expect(e.response).toBe('Invalid credentials');
        expect(e.status).toBe(HttpStatus.UNAUTHORIZED);
      }
    });
  });
});
