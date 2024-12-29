import { TypeEvent } from './../../src/common/enums/type-event.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './../../src/modules/event/event.service';
import { EventRepository } from './../../src/modules/event/event.repository';
import { CreateEventDto } from './../../src/modules/event/dto/create-event.dto';
import { UpdateEventDto } from './../../src/modules/event/dto/update-event.dto';
import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { Events } from './../../src/modules/event/entitys/event.entity';
import { Logger } from '@nestjs/common';

describe('EventService', () => {
  let service: EventService;
  let mockEventRepository: any;

  const mockEventRepositoryMethods = {
    findById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUserById: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: EventRepository,
          useValue: mockEventRepositoryMethods,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    mockEventRepository = module.get<EventRepository>(EventRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new event when it does not already exist', async () => {
      const createEventDto: CreateEventDto = {
        name: 'New Event',
        description: 'Event Description',
        location: 'Event Location',
        type: TypeEvent.CARDIO,
      };
      const userDto = { id: 'user1' };

      mockEventRepository.findById.mockResolvedValue(null);
      mockEventRepository.createUser.mockResolvedValue({
        ...createEventDto,
        createdBy: userDto.id,
      });

      const result = await service.create(createEventDto, userDto);

      expect(result).toEqual({ ...createEventDto, createdBy: userDto.id });
      expect(mockEventRepository.findById).toHaveBeenCalledWith(createEventDto.name);
      expect(mockEventRepository.createUser).toHaveBeenCalledWith(createEventDto, userDto.id);
    });

    it('should throw BadRequestException if event already exists', async () => {
      const createEventDto: CreateEventDto = {
        name: 'Existing Event',
        description: 'Event Description',
        location: 'Event Location',
        type: TypeEvent.CARDIO,
      };
      const userDto = { id: 'user1' };

      mockEventRepository.findById.mockResolvedValue({ name: 'Existing Event' }); // Simulate existing event

      try {
        await service.create(createEventDto, userDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Este evento ya se encuentra registrado');
        expect(mockEventRepository.findById).toHaveBeenCalledWith(createEventDto.name);
      }
    });

    it('should throw HttpException on internal errors', async () => {
      const createEventDto: CreateEventDto = {
        name: 'New Event',
        description: 'Event Description',
        location: 'Event Location',
        type: TypeEvent.CARDIO,
      };
      const userDto = { id: 'user1' };

      mockEventRepository.findById.mockRejectedValue(new Error('Unknown error'));

      try {
        await service.create(createEventDto, userDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Error al crear el usuario');
      }
    });
  });

  describe('update', () => {
    it('should update an event successfully', async () => {
      const id = 'event1';
      const updateEventDto: UpdateEventDto = {
        name: 'Updated Event',
        description: 'Updated Description',
        location: 'Updated Location',
        type: TypeEvent.CARDIO,
        isActive: true,
      };

      mockEventRepository.findById.mockResolvedValue(id);
      mockEventRepository.updateUser.mockResolvedValue(undefined);

      const result = await service.update(id, updateEventDto);

      expect(result).toEqual(id);
      expect(mockEventRepository.findById).toHaveBeenCalledWith(id);
      expect(mockEventRepository.updateUser).toHaveBeenCalledWith(updateEventDto);
    });

    it('should throw NotFoundException if event does not exist', async () => {
      const id = 'event1';
      const updateEventDto: UpdateEventDto = {
        name: 'Updated Event',
        description: 'Updated Description',
        location: 'Updated Location',
        type: TypeEvent.CARDIO,
        isActive: true,
      };

      mockEventRepository.findById.mockResolvedValue(null);

      try {
        await service.update(id, updateEventDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(`InvalidUserError`);
      }
    });

    it('should throw HttpException on internal errors', async () => {
      const id = 'event1';
      const updateEventDto: UpdateEventDto = {
        name: 'Updated Event',
        description: 'Updated Description',
        location: 'Updated Location',
        type: TypeEvent.CARDIO,
        isActive: true,
      };

      mockEventRepository.findById.mockResolvedValue({ id });
      mockEventRepository.updateUser.mockRejectedValue(new Error('Unknown error'));

      try {
        await service.update(id, updateEventDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('InvalidUserError');
      }
    });
  });

  describe('remove', () => {
    it('should delete an event successfully', async () => {
      const id = 'event1';

      mockEventRepository.findById.mockResolvedValue(null);

      const result = await service.remove(id);

      expect(result).toBeUndefined();
      expect(mockEventRepository.deleteUserById).toHaveBeenCalledWith(id);
    });

    it('should throw HttpException if event is found', async () => {
      const id = 'event1';

      mockEventRepository.findById.mockResolvedValue({ id });

      try {
        await service.remove(id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('El ID ingresado es incorrecto');
      }
    });
  });
});
