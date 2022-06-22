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
import { COOKIE_NAME } from '../config/constants';
import Post from '../entities/Post';

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

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number): Promise<boolean> {
    const user = await User.findOne({ where: { id } });
    if (!user) return false;

    await Post.delete({ creatorId: id });
    await User.delete(id);
    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('input', () => UsernamePasswordInput) input: UsernamePasswordInput,
    @Ctx() { req }: MyContext,
  ) : Promise<UserResponse> {
    const hashedPassword = await argon2.hash(input.password);
    let user: User | undefined;
    try {
      const res = await User.create({
        username: input.username,
        password: hashedPassword,
      }).save();
      user = res;
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

    if (req) req.session.userId = user!.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input', () => UsernamePasswordInput) input: UsernamePasswordInput,
    @Ctx() { req }: MyContext,
  ) : Promise<UserResponse> {
    const user = await User.findOne({ where: { username: input.username } });
    if (!user) {
      return {
        errors: [{
          field: 'user',
          message: "user doesn't exists",
        }],
      };
    }
    const valid = await argon2.verify(user.password, input.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    if (req) req.session.userId = user!.id;

    return {
      user,
    };
  }

  @Query(() => User, { nullable: true })
  getUserByQid(
    @Ctx() { req }: MyContext,
  ) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne({ where: { id: req.session.userId } });
  }

  @Mutation(() => Boolean)
  logout(
    @Ctx() { req, res }: MyContext,
  ) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => req.session.destroy((err) => {
      res.clearCookie(COOKIE_NAME as string);
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
    }));
  }
}

export default UserResolver;
