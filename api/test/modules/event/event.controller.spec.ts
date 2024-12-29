import {
  Req,
} from '@nestjs/common';
import { Role } from '../../../src/common/enums/role.enum';
import { TypeEvent } from '../../../src/common/enums/type-event.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from '../../../src/modules/event/event.controller';
import { EventService } from '../../../src/modules/event/event.service';
import { CreateEventDto } from '../../../src/modules/event/dto/create-event.dto';
import { UpdateEventDto } from '../../../src/modules/event/dto/update-event.dto';
import { UserDto } from '../../../src/modules/user/dto/user.dto';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  const mockEventService = {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: mockEventService,
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of events', async () => {
      const result = [{ name: 'Event 1' }, { name: 'Event 2' }];
      mockEventService.findAll.mockResolvedValue(result);

      const response = await controller.findAll({ limit: '10', offset: '0' });
      expect(response).toEqual(result);
      expect(mockEventService.findAll).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('findOne', () => {
    it('should return an event by ID', async () => {
      const event = { name: 'Event 1' };
      mockEventService.findById.mockResolvedValue(event);

      const response = await controller.findOne('event1');
      expect(response).toEqual(event);
      expect(mockEventService.findById).toHaveBeenCalledWith('event1');
    });

    it('should return null if event not found', async () => {
      mockEventService.findById.mockResolvedValue(null);

      const response = await controller.findOne('non-existing-id');
      expect(response).toBeNull();
      expect(mockEventService.findById).toHaveBeenCalledWith('non-existing-id');
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateEventDto: UpdateEventDto = { name: 'New Event', description: 'Description', location: 'Location', type: TypeEvent.CARDIO, isActive: true };
      const updatedEvent = { name: 'New Event', description: 'Description', location: 'Location', type: TypeEvent.CARDIO, isActive: true };
      mockEventService.update.mockResolvedValue(updatedEvent);

      const response = await controller.update('event1', updateEventDto);
      expect(response).toEqual(updatedEvent);
      expect(mockEventService.update).toHaveBeenCalledWith('event1', updateEventDto);
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      const eventId = 'event1';
      mockEventService.remove.mockResolvedValue(undefined);

      await controller.remove(eventId);
      expect(mockEventService.remove).toHaveBeenCalledWith(eventId);
    });
  });
});
