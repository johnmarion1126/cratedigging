import {
  Arg,
  Int,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  ObjectType,
  Ctx,
} from 'type-graphql';
import argon2 from 'argon2';

import User from '../entities/User';
import { MyContext } from '../types';
import dataSource from '../dataSource';

@InputType()
class UsernamePasswordInput {
  @Field(() => String)
    username!: string;

  @Field(() => String)
    password!: string;
}

@ObjectType()
class FieldError {
  @Field(() => String)
    field!: string;

  @Field(() => String)
    message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

  @Field(() => User, { nullable: true })
    user?: User;
}
@Resolver()
class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  user(@Arg('id', () => Int) id: number): Promise<User | null> {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('input', () => UsernamePasswordInput) input: UsernamePasswordInput,
    @Ctx() { req }: MyContext,
  ) : Promise<UserResponse> {
    const hashedPassword = await argon2.hash(input.password);
    let user;
    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: input.username,
          password: hashedPassword,
        })
        .returning('*')
        .execute();
      // eslint-disable-next-line prefer-destructuring
      user = result.raw[0];
    } catch (err: Error | any) {
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already been taken',
            },
          ],
        };
      }
    }
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number): Promise<boolean> {
    const res = await User.delete(id);
    if (res.affected) return true;
    return false;
  }
}

export default UserResolver;
