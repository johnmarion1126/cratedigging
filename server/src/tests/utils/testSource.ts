import { DataSource } from 'typeorm';

import {
  DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME,
} from '../../config/constants';
import Post from '../../entities/Post';
import User from '../../entities/User';

export const testSource = async (drop: boolean = false) => {
  const result = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT as string, 10),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'crates-test',
    dropSchema: drop,
    synchronize: drop,
    entities: [User, Post],
    migrations: ['src/migrations/*.ts'],
  });
  await result.initialize();
  return result;
};

export default testSource;
