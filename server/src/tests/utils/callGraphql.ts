import { buildSchema } from 'type-graphql';
import { graphql } from 'graphql';

import UserResolver from '../../resolvers/user';

interface Options {
  source: string;
  variableValues?: any;
}
const callGraphql = async ({ source, variableValues }: Options) => graphql({
  schema: await buildSchema({
    resolvers: [UserResolver],
  }),
  source,
  variableValues,
});

export default callGraphql;
