import { gql } from '@apollo/client';

const LOGIN = gql`
mutation($input: UsernamePasswordInput!) {
  login(input: $input) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`;

export default LOGIN;
