/* eslint-disable no-unused-vars */
import { DataSource } from 'typeorm';

import Post from '../entities/User';
import callGraphql from './utils/callGraphql';
import { testSource } from './utils/testSource';

const createPost = `
mutation($input: PostInput!) {
  createPost(input: $input) {
    title
    text
  }
}
`;

const updatePost = `
mutation($id: Int!, $input: PostInput!) {
  updatePost(id: $id, input: $input) {
    title
    text
  }
}
`;

const deletePost = `
mutation($id: Int!) {
  deletePost(id: $id)
}
`;

const TEST_ID = 1;
const TEST_INPUT = {
  title: 'Test title',
  text: 'Test text',
};

let connection: DataSource;

beforeAll(async () => {
  connection = await testSource();
});

afterAll(async () => {
  await connection.destroy();
});

describe('User Tests', () => {
  it('create post', async () => {
  });
});
