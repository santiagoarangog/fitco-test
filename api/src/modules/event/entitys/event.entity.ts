import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AuditFields } from 'src/common/entities/audit-fields.entity';
import { TypeEvent } from 'src/common/enums/type-event.enum';

@Entity()
export class Events extends AuditFields {
  @PrimaryColumn({ type: 'varchar', length: 36, unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 36 })
  name: string;

  @Column({ type: 'varchar', length: 36 })
  description: string;

  @Column({ type: 'enum', enum: TypeEvent, default: TypeEvent.CARDIO })
  type: string;

  @Column()
  location: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @BeforeInsert()
  setUuid() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
