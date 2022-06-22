/* eslint-disable no-unused-vars */
import { DataSource } from 'typeorm';

import Post from '../entities/Post';
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

const registerUser = `
mutation($input: UsernamePasswordInput!) {
  register(input: $input) {
    user {
      id
      username
    }
  }
}
`;

const TEST_ID = 1;
const TEST_INPUT = {
  title: 'Test title',
  text: 'Test text',
};
const TEST_USER = {
  username: 'John',
  password: 'John',
};

let connection: DataSource;

beforeAll(async () => {
  connection = await testSource();
});

afterAll(async () => {
  await connection.destroy();
});

describe('Post Tests', () => {
  it('create post', async () => {
    const resUser = await callGraphql({
      source: registerUser,
      variableValues: {
        input: TEST_USER,
      },
    });

    console.log(resUser?.data?.register?.user);

    const res = await callGraphql({
      source: createPost,
      variableValues: {
        input: TEST_INPUT,
      },
    });

    const post = await Post.findOne({ where: { id: TEST_ID } });
    expect(post?.title).toEqual(TEST_INPUT.title);
    expect(post?.text).toEqual(TEST_INPUT.text);
  });
});
