import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import argon from 'argon2';

import { Post } from './Post';
import { Draft } from './Draft';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, update: false })
  email: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 500, update: false })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Draft, (draft) => draft.author)
  drafts: Draft[];

  @CreateDateColumn()
  createdAt: string;

  constructor(username: string, email: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon.hash(this.password, { type: argon.argon2id });
  }

  verify(password: string): User | boolean {
    if (argon.verify(this.password, password)) return this;
    return false;
  }
}
