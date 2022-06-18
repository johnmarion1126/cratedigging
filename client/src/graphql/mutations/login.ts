import { gql } from '@apollo/client';

const LOGIN = gql`
mutation($password: String!, $username: String!) {
  login(password: $password, username: $username) {
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
