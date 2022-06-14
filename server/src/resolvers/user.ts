import {
  Arg,
  Field, InputType, Mutation, Query, Resolver,
} from 'type-graphql';
import User from '../entities/User';

@InputType()
class UsernamePasswordInput {
  @Field(() => String)
    username!: string;

  @Field(() => String)
    password!: string;
}
@Resolver()
class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => User)
  async createUser(
    @Arg('input', () => UsernamePasswordInput) input: UsernamePasswordInput,
  ) : Promise<User> {
    return User.create({
      ...input,
    }).save();
  }
}

export default UserResolver;
