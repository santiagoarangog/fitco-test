import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/auth/auth.decorator';
import { AuthUserDto } from './dto/auth-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  /**
   * Autenticación de usuario
   * @param {LoginDto} loginDto - Credenciales del usuario
   * @returns {Promise<AuthResponse>} Token JWT y datos del usuario
   * @throws {UnauthorizedException} Credenciales inválidas
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @ApiOperation({ summary: 'Autenticación del usuario' })
  @ApiResponse({ status: 201, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  /**
  * Recuperación de contraseña
  * @param {AuthUserDto} resetPasswordDto - Datos del usuario
  * @throws {UnauthorizedException} Credenciales inválidas
  * @throws {BadRequestException} Datos de entrada inválidos
  */
  @ApiOperation({ summary: 'Restablecer contraseña' })
  @ApiResponse({ status: 201, description: 'Solicitud de recuperación de contraseña exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @Public()
  async resetPassword(@Body() resetPasswordDto: AuthUserDto) {
    return this.authService.resetPassword(resetPasswordDto.email);
  }
  
  /**
  * Cambio de contraseña
  * @param {AuthUserDto} changePasswordDto - Datos del usuario
  * @throws {UnauthorizedException} Credenciales inválidas
  * @throws {BadRequestException} Datos de entrada inválidos
  */
  @ApiOperation({ summary: 'Cambio de la contraseña' })
  @ApiResponse({ status: 201, description: 'Cambio de contraseña exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() changePasswordDto: AuthUserDto) {
    return this.authService.changePassword(
      changePasswordDto.email,
      changePasswordDto.password,
      changePasswordDto.confirmPassword,
    );
  }

  /**
  * Inicio de sesión con token desde email de confirmación
  * @param {ValidateTokenDto} logInDto - Datos del usuario
  * @throws {UnauthorizedException} Credenciales inválidas
  * @throws {BadRequestException} Datos de entrada inválidos
  */
  @ApiOperation({ summary: 'Inicio de sesión desde email de confirmación' })
  @ApiResponse({ status: 201, description: 'Ingreso exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('login-from-email')
  @HttpCode(HttpStatus.OK)
  @Public()
  async loginFromEmail(@Body() logInDto: ValidateTokenDto) {
    return this.authService.loginFromEmail(logInDto.email, logInDto.token);
  }
}
