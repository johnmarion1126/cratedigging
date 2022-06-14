import { buildSchema } from 'type-graphql';
import { graphql } from 'graphql';

import UserResolver from '../../entities/User';

interface Options {
  source: string;
  variableValues?: any;
}
const gqlCall = async ({ source, variableValues }: Options) => graphql({
  schema: await buildSchema({
    resolvers: [UserResolver],
  }),
  source,
  variableValues,
});

export default gqlCall;
