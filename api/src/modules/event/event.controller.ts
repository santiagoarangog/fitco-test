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

@ApiTags('Eventos')
@ApiBearerAuth()
@Controller('events')
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene un listado de eventos' })
  @ApiResponse({ status: 200, description: 'Obtiene un listado de eventos' })
  findAll(@Query() request?: RequestDto) {
    const limit = request?.limit || '10';
    const offset = request?.offset || '0';
    return this.eventsService.findAll(
      parseInt(limit, 10),
      parseInt(offset, 10),
    );
  }

  @ApiOperation({ summary: 'Registra un nuevo evento' })
  @ApiResponse({ status: 200, description: 'Registra y lista el evento' })
  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @Req() req: Request & { user: UserDto },
  ) {
    return this.eventsService.create(createEventDto, req.user);
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
