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
  likes: number;

  @Column()
  views: number;

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
  setDefaults() {
    this.slug = this.title.replace(' ', '_').toLowerCase();
    this.readTime = this.calculateReadTime(this.content);
    this.likes = 0;
    this.views = 0;
  }

  calculateReadTime(content: string) {
    return 5;
  }

  @AfterLoad()
  updateViews() {
    this.views += 1;
  }
}
