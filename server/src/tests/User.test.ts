import { DataSource } from 'typeorm';

import User from '../entities/User';
import callGraphql from './utils/callGraphql';
import { testSource } from './utils/testSource';

const createUser = `
mutation($input: UsernamePasswordInput!) {
  createUser(input: $input) {
    id
  }
}
`;

const fetchUser = `
query($id: Int!) {
  user(id: $id) {
    username
  }
}`;

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
  it('create user', async () => {
    await callGraphql({
      source: createUser,
      variableValues: {
        input: TEST_INPUT,
      },
    });

    const user = await User.findOne({ where: { id: TEST_ID } });
    expect(user).toBeDefined();
  });

  it('fetch user', async () => {
    const res = await callGraphql({
      source: fetchUser,
      variableValues: {
        id: TEST_ID,
      },
    });

    const resName = res.data?.user?.username;
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
