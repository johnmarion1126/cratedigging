import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import Login from '../pages/login';
import LOGIN from '../graphql/mutations/login';

const mocks: MockedResponse<Record<string, any>>[] | undefined = [{
  request: {
    query: LOGIN,
    variables: {
      username: 'test_username',
      password: 'test_password',
    },
  },
  result: () => ({
    data: {
      user: { username: 'test_username', password: 'test_password' },
    },
  }),
}];

test('render login form', async () => {
  const component = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Login />
    </MockedProvider>,
  );

  await waitFor(() => {
    const usernameForm = component.getByTestId('username-form');
    const passwordForm = component.getByTestId('password-form');

    expect(usernameForm).toBeDefined();
    expect(passwordForm).toBeDefined();
  });
});
