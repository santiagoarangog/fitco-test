import { Role } from '../../../src/common/enums/role.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../src/modules/user/user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../src/modules/user/entitys/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../../src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/modules/user/dto/update-user.dto';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let repository: Repository<User>;

  const mockUserRepository = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of users with total count', async () => {
      const limit = 10;
      const offset = 0;
      const users = [{ uuid: '1', name: 'John Doe' }];
      const total = 1;
      mockUserRepository.findAndCount.mockResolvedValue([users, total]);

      const result = await userRepository.findAll(limit, offset);

      expect(result).toEqual({ items: users, total });
      expect(mockUserRepository.findAndCount).toHaveBeenCalledWith({
        skip: offset * limit,
        take: limit,
      });
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      const id = '1';
      const user = { uuid: id, name: 'John Doe' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await userRepository.findById(id);

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { uuid: id },
      });
    });

    it('should return undefined if user is not found', async () => {
      const id = '1';
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await userRepository.findById(id);

      expect(result).toBeNull();
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'john@example.com';
      const user = { uuid: '1', email, name: 'John Doe' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await userRepository.findUserByEmail(email);

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return undefined if user with email is not found', async () => {
      const email = 'john@example.com';
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await userRepository.findUserByEmail(email);

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john@example.com', password: 'password', confirmPassword: 'password', role: Role.USER, phone: '1234567890' };
      const hashedPassword = 'hashedPassword';
      const newUser = { ...createUserDto, password: hashedPassword, uuid: '1' };
      mockUserRepository.create.mockReturnValue(newUser);
      mockUserRepository.save.mockResolvedValue(newUser);

      const result = await userRepository.createUser(createUserDto, hashedPassword);

      expect(result).toEqual(newUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
    });
  });

  describe('updateUser', () => {
    it('should update the user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };
      mockUserRepository.save.mockResolvedValue(undefined);

      await userRepository.updateUser(updateUserDto);

      expect(mockUserRepository.save).toHaveBeenCalledWith(updateUserDto);
    });
  });

  describe('deleteUserById', () => {
    it('should delete the user by ID', async () => {
      const id = '1';
      mockUserRepository.delete.mockResolvedValue(undefined);

      await userRepository.deleteUserById(id);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('activeUser', () => {
    it('should update the user status to active', async () => {
      const id = '1';
      const status = true;
      mockUserRepository.update.mockResolvedValue(undefined);

      await userRepository.activeUser(id, status);

      expect(mockUserRepository.update).toHaveBeenCalledWith(id, { isActive: status });
    });

    it('should update the user status to inactive', async () => {
      const id = '1';
      const status = false;
      mockUserRepository.update.mockResolvedValue(undefined);

      await userRepository.activeUser(id, status);

      expect(mockUserRepository.update).toHaveBeenCalledWith(id, { isActive: status });
    });
  });
});
