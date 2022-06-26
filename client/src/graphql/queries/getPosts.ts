import { gql } from '@apollo/client';

const GET_POSTS = gql`
query {
  posts {
    text
    title
    creator {
      id
      username
    }
  }
}
`;

export default GET_POSTS;
