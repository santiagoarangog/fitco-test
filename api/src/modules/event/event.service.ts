import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UserDto } from '../user/dto/user.dto';
import { Events } from './entitys/event.entity';

@Injectable()
export class EventService {
  private readonly logger = new Logger('UserService');

  constructor(private readonly eventRepository: EventRepository) {}

  async create(createEventDto: CreateEventDto, createdBy: UserDto) {
    try {
      const existingEvent = await this.eventRepository.findById(
        createEventDto.name,
      );

      if (existingEvent) {
        throw new BadRequestException('Este evento ya se encuentra registrado');
      }

      const newUser = await this.eventRepository.createUser(
        createEventDto,
        createdBy.id,
      );

      return newUser;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new HttpException(
        'Error al crear el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(limit: number, offset: number) {
    return await this.eventRepository.findAll(limit, offset);
  }

  async findById(id: string) {
    return this.eventRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateEventDto): Promise<Events> {
    try {
      const user = await this.eventRepository.findById(id);

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      await this.eventRepository.updateUser(updateUserDto);

      return await this.eventRepository.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'InvalidUserError',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    const existingUser = await this.eventRepository.findById(id);
    if (existingUser) {
      throw new HttpException(
        'El ID ingresado es incorrecto',
        HttpStatus.CONFLICT,
      );
    }
    return await this.eventRepository.deleteUserById(id);
  }
}
