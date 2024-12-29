import { Role } from '../../../src/common/enums/role.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/modules/user/user.controller';
import { UserService } from '../../../src/modules/user/user.service';
import { CreateUserDto } from '../../../src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '../../../src/modules/user/dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { RequestDto } from 'src/common/dto/request.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    createUser: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const requestDto: RequestDto = { limit: '10', offset: '0' };
      const result = [{ id: '1', name: 'John Doe' }];
      mockUserService.findAll.mockResolvedValue(result);

      const response = await controller.findAll(requestDto);

      expect(response).toEqual(result);
      expect(mockUserService.findAll).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('register', () => {
    it('should register and return the created user', async () => {
      const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john@example.com', password: 'password', confirmPassword: 'password', phone: '1234567890', role: Role.USER };
      const createdUser = { ...createUserDto, id: '1' };
      mockUserService.createUser.mockResolvedValue(createdUser);

      const response = await controller.register(createUserDto);

      expect(response).toEqual(createdUser);
      expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const id = '1';
      const user = { id, name: 'John Doe' };
      mockUserService.findById.mockResolvedValue(user);

      const response = await controller.findOne(id);

      expect(response).toEqual(user);
      expect(mockUserService.findById).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const id = '1';
      mockUserService.findById.mockResolvedValue(null);

      try {
        await controller.findOne(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Usuario no encontrado.');
      }
    });
  });

  describe('update', () => {
    it('should update the user successfully', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = { name: 'Updated Name', email: 'updated@example.com' };
      const updatedUser = { id, ...updateUserDto };
      mockUserService.update.mockResolvedValue(updatedUser);

      const response = await controller.update(id, updateUserDto);

      expect(response).toEqual(updatedUser);
      expect(mockUserService.update).toHaveBeenCalledWith(id, updateUserDto);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = { name: 'Updated Name', email: 'updated@example.com' };
      mockUserService.update.mockResolvedValue(null);

      try {
        await controller.update(id, updateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Usuario no encontrado.');
      }
    });
  });

  describe('remove', () => {
    it('should remove the user successfully', async () => {
      const id = '1';
      mockUserService.remove.mockResolvedValue(undefined);

      const response = await controller.remove(id);

      expect(response).toBeUndefined();
      expect(mockUserService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const id = '1';
      mockUserService.remove.mockResolvedValue(null);

      try {
        await controller.remove(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Usuario no encontrado.');
      }
    });
  });
});
