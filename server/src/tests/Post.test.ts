import { DataSource } from 'typeorm';

import Post from '../entities/Post';
import callGraphql from './utils/callGraphql';
import { testSource } from './utils/testSource';
import { deleteUser } from './User.test';
import { TEST_POST, TEST_ID, UPDATE_TEST_POST } from './utils/constants';

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

let connection: DataSource;

beforeAll(async () => {
  connection = await testSource();
});

afterAll(async () => {
  await connection.destroy();
});

describe('Post Tests', () => {
  it('create post', async () => {
    await callGraphql({
      source: createPost,
      variableValues: {
        input: TEST_POST,
      },
    });

    const post = await Post.findOne({ where: { id: TEST_ID } });
    expect(post?.title).toEqual(TEST_POST.title);
    expect(post?.text).toEqual(TEST_POST.text);
  });

  it('update post', async () => {
    await callGraphql({
      source: updatePost,
      variableValues: {
        id: TEST_ID,
        input: UPDATE_TEST_POST,
      },
    });

    const post = await Post.findOne({ where: { id: TEST_ID } });
    expect(post?.title).toEqual(UPDATE_TEST_POST.title);
    expect(post?.text).toEqual(UPDATE_TEST_POST.text);
  });

  it('delete user and posts', async () => {
    const res = await callGraphql({
      source: deleteUser,
      variableValues: {
        id: TEST_ID,
      },
    });

    const resState = res.data?.deleteUser;
    expect(resState).toBeTruthy();
    const post = await Post.find({ where: { id: TEST_ID } });
    expect(post.length).toEqual(0);
  });
});
