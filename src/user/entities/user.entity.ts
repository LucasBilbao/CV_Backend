import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../utils/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25, unique: true })
  username: string;

  @Column({ length: 25, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
