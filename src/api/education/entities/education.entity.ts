import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('educations')
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  level: string;

  @Column()
  specialty: string;

  @Column()
  school: string;

  @Column()
  start: Date;

  @Column({ nullable: true })
  end: Date;

  @Column()
  country: string;

  @Column({ nullable: true })
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
