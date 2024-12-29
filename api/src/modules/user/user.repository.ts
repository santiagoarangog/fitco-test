import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entitys/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(
    limit: number,
    offset: number,
  ): Promise<{ items: User[]; total: number }> {
    const [items, total] = await this.userRepository.findAndCount({
      skip: offset * limit,
      take: limit,
    });

    return { items, total };
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { uuid: id } });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(
    createUserDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<User> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async updateUser(user: UpdateUserDto): Promise<void> {
    await this.userRepository.save(user);
  }

  async deleteUserById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async activeUser(id: string, status: boolean): Promise<void> {
    await this.userRepository.update(id, { isActive: status });
  }
}
