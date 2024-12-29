import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from 'src/common/enums/role.enum';
import { AuditFields } from 'src/common/entities/audit-fields.entity';

@Entity()
export class User extends AuditFields {
  @PrimaryColumn({ type: 'varchar', length: 36, unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  confirmPassword: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tokenEmail: string;

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
