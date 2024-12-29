import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'token_history' })
export class TokenHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  token: string;
}
