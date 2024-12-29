import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './entitys/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
  ) {}

  async findAll(
    limit: number,
    offset: number,
  ): Promise<{ items: Events[]; total: number }> {
    const [items, total] = await this.eventRepository.findAndCount({
      skip: offset * limit,
      take: limit,
    });

    return { items, total };
  }

  async findById(id: string): Promise<Events> {
    return this.eventRepository.findOne({ where: { uuid: id } });
  }

  async createUser(
    createEventDto: CreateEventDto,
    createdBy: string,
  ): Promise<Events> {
    const newUser = this.eventRepository.create({
      ...createEventDto,
      createdBy,
    });

    return await this.eventRepository.save(newUser);
  }

  async updateUser(user: UpdateEventDto): Promise<void> {
    await this.eventRepository.save(user);
  }

  async deleteUserById(id: string): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
