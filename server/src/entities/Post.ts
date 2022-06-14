import { Int, Field, ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
    id!: number;

  @Field(() => String)
  @Column('title')
    title!: string;

  @Field(() => String)
  @CreateDateColumn()
    createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
    updatedAt!: Date;
}

export default Post;
