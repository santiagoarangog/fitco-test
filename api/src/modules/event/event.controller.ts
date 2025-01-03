import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestDto } from 'src/common/dto/request.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';
import { UserDto } from '../user/dto/user.dto';
import { Events } from './entitys/event.entity';

@ApiTags('Eventos')
@ApiBearerAuth()
@Controller('events')
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  /**
   * Obtiene un listado de eventos
   * @param {RequestDto} request - Información del filtrado
   * @returns {Promise<{items: Events[]; total: number}>} Información de eventos y total de registros
   * @throws {UnauthorizedException} Credenciales inválidas
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @ApiOperation({ summary: 'Obtiene un listado de eventos' })
  @ApiResponse({ status: 200, description: 'Obtiene un listado de eventos' })
  @Get()
  findAll(@Query() request?: RequestDto): Promise<{ items: Events[]; total: number; }> {
    const limit = request?.limit || '10';
    const offset = request?.offset || '0';
    return this.eventsService.findAll(
      parseInt(limit, 10),
      parseInt(offset, 10),
    );
  }

  /**
   * Obtiene un listado de eventos
   * @param {CreateEventDto} createEventDto - Información del evento
   * @param {Request} req - Información del filtrado
   * @returns {Promise<Events>} Información del evento
   * @throws {UnauthorizedException} Credenciales inválidas
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @ApiOperation({ summary: 'Registra un nuevo evento' })
  @ApiResponse({ status: 200, description: 'Registra y lista el evento' })
  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @Req() req: Request & { user: UserDto },
  ): Promise<Events> {
    return this.eventsService.create(createEventDto, req.user);
  }

  /**
   * Obtiene un listado de eventos
   * @param {string} id - Id del Evento
   * @returns {Promise<Events>} Información del evento
   * @throws {UnauthorizedException} Credenciales inválidas
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @ApiOperation({ summary: 'Obtiene información del evento indicado' })
  @ApiResponse({
    status: 200,
    description: 'Evento encontrado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Evento no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Events> {
    return this.eventsService.findById(id);
  }

  /**
   * Actualiza la información del evento
   * @param {string} id - Id del Evento
   * @param {UpdateEventDto} updateEventDto - Información del evento
   * @returns {Promise<Events>} Información del evento
   * @throws {UnauthorizedException} Credenciales inválidas
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @ApiOperation({ summary: 'Actualiza la información del evento' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Events> {
    return this.eventsService.update(id, updateEventDto);
  }

  /**
   * Elimina la información del evento
   * @param {string} id - Id del Evento
   * @returns {Promise<void>} Información del evento
   * @throws {UnauthorizedException} Credenciales inválidas
   * @throws {BadRequestException} Datos de entrada inválidos
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }
}
