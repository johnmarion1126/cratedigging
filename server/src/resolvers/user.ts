import { Query, Resolver } from 'type-graphql';
import User from '../entities/User';

@Resolver()
class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }
}

export default UserResolver;
