import { ObjectType, Field, Int } from 'type-graphql';
import {
  BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import Post from './Post';

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
    id!: number;

  @Field(() => String)
  @Column('text', { unique: true })
    username!: string;

  @Column('text')
    password!: string;

  @OneToMany(() => Post, (post) => post.creator)
    posts!: Post[];

  @Field(() => String)
  @CreateDateColumn()
    createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
    updatedAt!: Date;
}

export default User;
