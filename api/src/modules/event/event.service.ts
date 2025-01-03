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

/**
 * Servicio de eventos
 * @class EventService
 * @description Maneja todas las operaciones relacionadas con los eventos del usuario
 */
@Injectable()
export class EventService {
  private readonly logger = new Logger('EventService');

  constructor(private readonly eventRepository: EventRepository) {}

  /**
   * Crear un nuevo evento
   * @param {CreateEventDto} createEventDto - Información del evento
   * @param {UserDto} createdBy - Información del usuario que crea el evento
   * @returns {Promise<Events>} Información de los eventos
   * @throws {NotFoundException} Error al crear el usuario
   * @throws {DatabaseException} Error de conexión DB
   */
  async create(createEventDto: CreateEventDto, createdBy: UserDto): Promise<Events> {
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

  /**
   * Listado de eventos
   * @param {number} limit - Indica la cantidad de eventos a mostrar
   * @param {number} offset - Indica la cantidad de eventos a saltar
   * @returns {Promise<{items: Events[]; total: number}>} Información de los eventos
   * @throws {NotFoundException} Error al crear el usuario
   * @throws {DatabaseException} Error de conexión DB
   */
  async findAll(limit: number, offset: number): Promise<{ items: Events[]; total: number; }> {
    return await this.eventRepository.findAll(limit, offset);
  }

  /**
   * Retorna un evento por su ID
   * @param {number} id - Indica la cantidad de eventos a mostrar
   * @returns {Promise<Events>} Información de los eventos
   * @throws {NotFoundException} Error al crear el usuario
   * @throws {DatabaseException} Error de conexión DB
   */
  async findById(id: string): Promise<Events> {
    return this.eventRepository.findById(id);
  }

  /**
   * Actualiza la información del evento
   * @param {number} id - ID de un evento en particular
   * @param {UpdateEventDto} updateUserDto - Información del evento
   * @returns {Promise<Events>} Información de los eventos
   * @throws {NotFoundException} User with id ${id} not found
   * @throws {NotFoundException} InvalidUserError
   * @throws {DatabaseException} Error de conexión DB
   */
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

  /**
   * Eliminación de un evento
   * @param {number} id - ID de un evento en particular
   * @returns {Promise<void>} Retorna el evento eliminado
   * @throws {NotFoundException} User with id ${id} not found
   * @throws {NotFoundException} El ID ingresado es incorrecto
   * @throws {DatabaseException} Error de conexión DB
   */
  async remove(id: string): Promise<void> {
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
