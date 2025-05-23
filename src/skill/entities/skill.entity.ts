import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  skill: string;

  @Column()
  level: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
