import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { PORT } from './config/constants';
import dataSource from './dataSource';
import UserResolver from './resolvers/user';

const startServer = async () => {
  await dataSource.initialize();
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

startServer().catch((e) => {
  console.error(e);
});
