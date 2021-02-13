import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  AfterLoad,
  PrimaryColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class Draft {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  hash: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description: string;

  @Column({ type: 'json', default: '{}' })
  content: object;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  @ManyToOne(() => User, (user) => user.posts)
  author: number;
}
