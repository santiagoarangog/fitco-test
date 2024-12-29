import { Column } from 'typeorm';

export class AuditFields {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  createdBy: string;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  removedBy: string;
}
