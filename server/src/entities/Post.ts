import { Int, Field, ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import User from './User';

@ObjectType()
@Entity()
class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
    id!: number;

  @Field(() => String)
  @Column('text')
    title!: string;

  @Field(() => String)
  @Column('text')
    text!: string;

  @Field(() => Int)
  @Column({ type: 'int' })
    creatorId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
    creator!: User;

  @Field(() => String)
  @CreateDateColumn()
    createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
    updatedAt!: Date;
}

export default Post;
