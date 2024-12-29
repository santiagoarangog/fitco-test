import { TypeEvent } from './../../src/common/enums/type-event.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { EventRepository } from '../../src/modules/event/event.repository';
import { Repository } from 'typeorm';
import { Events } from '../../src/modules/event/entitys/event.entity';
import { CreateEventDto } from '../../src/modules/event/dto/create-event.dto';
import { UpdateEventDto } from '../../src/modules/event/dto/update-event.dto';

describe('EventRepository', () => {
  let repository: EventRepository;
  let eventRepository: Repository<Events>;

  const mockEventRepository = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventRepository,
        {
          provide: Repository,
          useValue: mockEventRepository,
        },
      ],
    }).compile();

    repository = module.get<EventRepository>(EventRepository);
    eventRepository = module.get<Repository<Events>>(Repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of events and total count', async () => {
      const events = [new Events(), new Events()];
      const total = 2;
      mockEventRepository.findAndCount.mockResolvedValue([events, total]);

      const result = await repository.findAll(10, 0);
      expect(result).toEqual({ items: events, total });
    });
  });

//   describe('findById', () => {
//     it('should return an event by id', async () => {
//       const event = new Events();
//       mockEventRepository.findOne.mockResolvedValue(event);

//       const result = await repository.findById('event1');
//       expect(result).toBe(event);
//     });

//     it('should return null if event not found', async () => {
//       mockEventRepository.findOne.mockResolvedValue(null);

//       const result = await repository.findById('non-existing-id');
//       expect(result).toBeNull();
//     });
//   });

//   describe('createUser', () => {
//     it('should create and save a new event', async () => {
//       const createEventDto: CreateEventDto = { name: 'newEvent', description: 'This is a example', location: 'Mexico DF', type: TypeEvent.CARDIO };
//       const createdBy = 'user1';
//       const newEvent = new Events();
//       mockEventRepository.create.mockReturnValue(newEvent);
//       mockEventRepository.save.mockResolvedValue(newEvent);

//       const result = await repository.createUser(createEventDto, createdBy);
//       expect(result).toBe(newEvent);
//       expect(mockEventRepository.create).toHaveBeenCalledWith({
//         ...createEventDto,
//         createdBy,
//       });
//       expect(mockEventRepository.save).toHaveBeenCalledWith(newEvent);
//     });
//   });

//   describe('updateUser', () => {
//     it('should update an existing event', async () => {
//       const updateEventDto: UpdateEventDto = { name: 'Update Event', description: 'This is a example', location: 'Mexico DF', type: TypeEvent.CARDIO, isActive: true };
//       mockEventRepository.save.mockResolvedValue(undefined);

//       await repository.updateUser(updateEventDto);
//       expect(mockEventRepository.save).toHaveBeenCalledWith(updateEventDto);
//     });
//   });

//   describe('deleteUserById', () => {
//     it('should delete an event by id', async () => {
//       const eventId = 'event1';
//       mockEventRepository.delete.mockResolvedValue(undefined);

//       await repository.deleteUserById(eventId);
//       expect(mockEventRepository.delete).toHaveBeenCalledWith(eventId);
//     });
//   });
});
