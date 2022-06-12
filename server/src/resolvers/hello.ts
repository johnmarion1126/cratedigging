import { Resolver, Query } from 'type-graphql';

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return 'hello world';
  }
}

export default HelloResolver;
