import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entitys/user.entity';

export class UserDto extends PartialType(CreateUserDto) {
  id: string;
}
export function convertUserToDto(user: User): UserDto {
  const dto = new UserDto();
  dto.id = user.uuid;
  dto.name = user.name;
  dto.role = user.role;
  dto.phone = user.phone;
  dto.email = user.email;

  return dto;
}
