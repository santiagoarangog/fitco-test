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
import { User } from './entitys/user.entity';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Obtiene un listado de usuarios
   * @param {RequestDto} request - Información del filtrado
   * @returns {Promise<{items: User[]; total: number}>} Información de usuarios y total de registros
   * @throws {UnauthorizedException} Credenciales inválidas
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @Get()
  @ApiOperation({ summary: 'Obtiene un listado de usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente.',
  })
  findAll(@Query() request?: RequestDto): Promise<{ items: User[]; total: number; }> {
    const limit = request?.limit || '10';
    const offset = request?.offset || '0';
    return this.userService.findAll(parseInt(limit, 10), parseInt(offset, 10));
  }

  /**
   * Registra un nuevo usuario
   * @param {CreateUserDto} createUserDto - Información de los usuarios
   * @returns {Promise<User>} Información del usuario creado
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @Public()
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  @ApiResponse({
    status: 200,
    description: 'Registra y lista el usuario creado',
  })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Obtener un usuario por su ID
   * @param {string} id - ID del usuario
   * @returns {Promise<User>} Retorna la información del usuario
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  /**
   * Actualiza un usuario en especifico
   * @param {string} id - ID del usuario
   * @param {UpdateUserDto} updateUserDto - Información del usuario a actualizar
   * @returns {Promise<User>} Retorna la información del usuario
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @ApiOperation({ summary: 'Actualiza la información del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Actualiza la información del usuario correctamente',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Elimina un usuario en especifico
   * @param {string} id - ID del usuario
   * @returns {Promise<any>} Retorna la información del usuario
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @ApiOperation({ summary: 'Elimina un usuario en especifico' })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado correctamente',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.userService.remove(id);
  }
}
