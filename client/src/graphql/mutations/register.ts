import { gql } from '@apollo/client';

const REGISTER = gql`
mutation($input: UsernamePasswordInput!) {
  register(input: $input) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
`;

export default REGISTER;
