import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/auth/auth.decorator';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserDto } from '../user/dto/user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @Public()
  async resetPassword(@Body() resetPasswordDto: AuthUserDto) {
    return this.authService.resetPassword(resetPasswordDto.email);
  }
  
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() changePasswordDto: AuthUserDto) {
    return this.authService.changePassword(
      changePasswordDto.email,
      changePasswordDto.password,
      changePasswordDto.confirmPassword,
    );
  }

  @Post('login-from-email')
  @HttpCode(HttpStatus.OK)
  @Public()
  async loginFromEmail(@Body() logInDto: ValidateTokenDto) {
    return this.authService.loginFromEmail(logInDto.email, logInDto.token);
  }
}
