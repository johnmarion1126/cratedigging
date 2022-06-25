import { buildSchema } from 'type-graphql';
import { graphql } from 'graphql';

import UserResolver from '../../src/resolvers/user';
import PostResolver from '../../src/resolvers/post';

interface Options {
  source: string;
  variableValues?: any;
}

const callGraphql = async ({ source, variableValues }: Options) => graphql({
  schema: await buildSchema({
    resolvers: [UserResolver, PostResolver],
  }),
  source,
  variableValues,
  contextValue: (req: Request, res: Response) => ({ req, res }),
});

export default callGraphql;
