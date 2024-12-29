import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/auth/auth.decorator';
import { RequestDto } from 'src/common/dto/request.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene un listado de usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente.',
  })
  findAll(@Query() request?: RequestDto) {
    const limit = request?.limit || '10';
    const offset = request?.offset || '0';
    return this.userService.findAll(parseInt(limit, 10), parseInt(offset, 10));
  }

  @Public()
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  @ApiResponse({
    status: 200,
    description: 'Registra y lista el usuario creado',
  })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
