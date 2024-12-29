import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthUserDto {
  @ApiProperty({
    description: 'Correo electrónico',
    example: 'usuario@empresa.com',
    type: String,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña',
    example: '*************',
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'Confirmar contraseña',
    example: '*************',
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  @IsOptional()
  confirmPassword: string;
}
