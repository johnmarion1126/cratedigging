import 'reflect-metadata';
import cors from 'cors';
import Redis from 'ioredis';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { COOKIE_NAME, PORT, SECRET } from './config/constants';
import dataSource from './dataSource';
import UserResolver from './resolvers/user';

const startServer = async () => {
  await dataSource.initialize();
  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = new Redis();

  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'https://studio.apollographql.com',
      ],
      credentials: true,
    }),
  );

  app.set('trust proxy', process.env.NODE_ENV !== 'production');
  app.set('x-forwarded-proto', 'https');

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      },
      saveUninitialized: false,
      secret: SECRET as string,
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res, redisClient }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: [
        'http://localhost:3000',
        'https://studio.graphql.com',
      ],
    },
  });

  app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

startServer().catch((e) => {
  console.error(e);
});
