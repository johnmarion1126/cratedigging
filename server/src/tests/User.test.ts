import { DataSource } from 'typeorm';

import User from '../entities/User';
import callGraphql from './utils/callGraphql';
import { testSource } from './utils/testSource';
import { TEST_ID, TEST_USER } from './utils/constants';

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

const loginUser = `
mutation($input: UsernamePasswordInput!) {
  login(input: $input) {
    user {
      id
      username
    }
  }
}
`;

// eslint-disable-next-line import/prefer-default-export
export const deleteUser = `
mutation($id: Int!) {
  deleteUser(id: $id)
}`;

let connection: DataSource;

beforeAll(async () => {
  connection = await testSource();
});

afterAll(async () => {
  await connection.destroy();
});

describe('User Tests', () => {
  it('register user', async () => {
    await callGraphql({
      source: registerUser,
      variableValues: {
        input: TEST_USER,
      },
    });

    const user = await User.findOne({ where: { id: TEST_ID } });
    expect(user?.username).toEqual(TEST_USER.username);
  });

  it('login user', async () => {
    const res = await callGraphql({
      source: loginUser,
      variableValues: {
        input: TEST_USER,
      },
    });

    const resName = res.data?.login?.user?.username;
    expect(resName).toEqual(TEST_USER.username);
  });
});
