import { DataSource } from 'typeorm';

import User from '../entities/User';
import callGraphql from './utils/callGraphql';
import { testSource } from './utils/testSource';

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

// eslint-disable-next-line no-unused-vars
const loginUser = `
mutation($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    user {
      id
      username
    }
  }
}
`;

// eslint-disable-next-line no-unused-vars
const deleteUser = `
mutation($id: Int!) {
  deleteUser(id: $id)
}`;

const TEST_ID = 1;
const TEST_INPUT = {
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

describe('User Tests', () => {
  it('register user', async () => {
    await callGraphql({
      source: registerUser,
      variableValues: {
        input: TEST_INPUT,
      },
    });
    const user = await User.findOne({ where: { id: TEST_ID } });
    expect(user?.username).toEqual(TEST_INPUT.username);
  });

  it('login user', async () => {
    const res = await callGraphql({
      source: loginUser,
      variableValues: {
        username: TEST_INPUT.username,
        password: TEST_INPUT.password,
      },
    });

    const resName = res.data?.login?.user?.username;
    expect(resName).toEqual(TEST_INPUT.username);
  });

  it('delete user', async () => {
    const res = await callGraphql({
      source: deleteUser,
      variableValues: {
        id: TEST_ID,
      },
    });

    const resState = res.data?.deleteUser;
    expect(resState).toBeTruthy();
  });
});
