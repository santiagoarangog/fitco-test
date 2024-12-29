import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class ValidateTokenDto {
  @ApiProperty({
    description: 'Correo electrónico',
    example: 'usuario@empresa.com',
    type: String,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Token del usuario',
    example: '*************',
    type: String,
  })
  @IsString()
  @IsOptional()
  token: string;
}
