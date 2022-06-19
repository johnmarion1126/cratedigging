import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { act } from 'react-test-renderer';
import Login from '../pages/login';

// eslint-disable-next-line no-unused-vars
const mocks: MockedResponse<Record<string, any>>[] | undefined = [];

test('render note form', async () => {
  await act(() => {
    render(
      <Login />,
    );
  });

  screen.getByTestId('login-btn');
});
