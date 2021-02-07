import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  AfterLoad
} from 'typeorm';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column()
  likes: string;

  @Column()
  views: string;

  @Column()
  readTime: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  @ManyToOne(() => User, (user) => user.posts)
  author: number;

  @BeforeInsert()
  createSlug() {
    this.slug = this.title.replace(' ', '_').toLowerCase();
  }

  @BeforeInsert()
  calculateReadTime() {
    this.readTime = 5;
  }

  @AfterLoad()
  updateViews() {
    this.views += 1;
  }
}
