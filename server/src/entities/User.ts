import { ObjectType, Field, Int } from 'type-graphql';
import {
  BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

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

  @Field(() => String)
  @CreateDateColumn()
    createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
    updatedAt!: Date;
}

export default User;
