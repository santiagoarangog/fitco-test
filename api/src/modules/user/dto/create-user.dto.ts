import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsIn,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'El rol del usuario',
    example: 'ADMIN, USER',
    type: Array,
  })
  @IsOptional()
  @IsIn([Role.ADMIN, Role.USER])
  @IsString()
  role: Role;

  @ApiProperty({
    description: 'Número de teléfono',
    example: '+123456789',
    type: String,
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'usuario@fitco.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña',
    example: '123456789ABCD',
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'Contraseña de validación',
    example: '123456789ABCD',
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  @IsOptional()
  confirmPassword: string;
}
