import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;
}
