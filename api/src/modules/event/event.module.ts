import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entitys/event.entity';
import { EventRepository } from './event.repository';

@Module({
  controllers: [EventController],
  providers: [EventService, EventRepository],
  imports: [TypeOrmModule.forFeature([Events])],
})
export class EventsModule {}
