import {
  Arg,
  Int,
  Field, InputType, Mutation, Query, Resolver, ObjectType,
} from 'type-graphql';
import User from '../entities/User';

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

  @Mutation(() => User)
  async createUser(
    @Arg('input', () => UsernamePasswordInput) input: UsernamePasswordInput,
  ) : Promise<User> {
    return User.create({
      ...input,
    }).save();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number): Promise<boolean> {
    const res = await User.delete(id);
    if (res.affected) return true;
    return false;
  }
}

export default UserResolver;
