import 'reflect-metadata';
import express from 'express';

import { PORT } from './utils/constants';
import dataSource from './dataSource';

const startServer = async () => {
  await dataSource.initialize();
  const app = express();

  app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

startServer().catch((e) => {
  console.error(e);
});
