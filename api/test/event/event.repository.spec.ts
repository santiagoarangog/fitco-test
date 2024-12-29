import { Events } from './../../src/modules/event/entitys/event.entity';
import { EventRepository } from './../../src/modules/event/event.repository';
import { TypeEvent } from './../../src/common/enums/type-event.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenHistory } from '../../src/modules/auth/entitys/token-history.entity';
import { CreateEventDto } from '../../src/modules/event/dto/create-event.dto';
import { UpdateEventDto } from '../../src/modules/event/dto/update-event.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EventRepository', () => {
    let repository: EventRepository;
    let eventsRepository: Repository<Events>;

    const mockEventsRepository = {
        findAndCount: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventRepository,
                {
                    provide: getRepositoryToken(Events),
                    useValue: mockEventsRepository,
                },
            ],
        }).compile();

        repository = module.get<EventRepository>(EventRepository);
        eventsRepository = module.get<Repository<Events>>(getRepositoryToken(Events));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

  describe('findAll', () => {
    it('should return a list of events and total count', async () => {
      const events = [new Events(), new Events()];
      const total = 2;
      mockEventsRepository.findAndCount.mockResolvedValue([events, total]);

      const result = await repository.findAll(10, 0);
      expect(result).toEqual({ items: events, total });
    });
  });

  describe('findById', () => {
    it('should return an event by id', async () => {
      const event = new Events();
      mockEventsRepository.findOne.mockResolvedValue(event);

      const result = await repository.findById('event1');
      expect(result).toBe(event);
    });

    it('should return null if event not found', async () => {
      mockEventsRepository.findOne.mockResolvedValue(null);

      const result = await repository.findById('non-existing-id');
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create and save a new event', async () => {
      const createEventDto: CreateEventDto = { name: 'newEvent', description: 'This is a example', location: 'Mexico DF', type: TypeEvent.CARDIO };
      const createdBy = 'user1';
      const newEvent = new Events();
      mockEventsRepository.create.mockReturnValue(newEvent);
      mockEventsRepository.save.mockResolvedValue(newEvent);

      const result = await repository.createUser(createEventDto, createdBy);
      expect(result).toBe(newEvent);
      expect(mockEventsRepository.create).toHaveBeenCalledWith({
        ...createEventDto,
        createdBy,
      });
      expect(mockEventsRepository.save).toHaveBeenCalledWith(newEvent);
    });
  });

  describe('updateUser', () => {
    it('should update an existing event', async () => {
      const updateEventDto: UpdateEventDto = { name: 'Update Event', description: 'This is a example', location: 'Mexico DF', type: TypeEvent.CARDIO, isActive: true };
      mockEventsRepository.save.mockResolvedValue(undefined);

      await repository.updateUser(updateEventDto);
      expect(mockEventsRepository.save).toHaveBeenCalledWith(updateEventDto);
    });
  });

  describe('deleteUserById', () => {
    it('should delete an event by id', async () => {
      const eventId = 'event1';
      mockEventsRepository.delete.mockResolvedValue(undefined);

      await repository.deleteUserById(eventId);
      expect(mockEventsRepository.delete).toHaveBeenCalledWith(eventId);
    });
  });
});
