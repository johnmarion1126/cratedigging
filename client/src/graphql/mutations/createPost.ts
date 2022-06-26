import { gql } from '@apollo/client';

const CREATE_POST = gql`
mutation($input: PostInput!) {
  createPost(input: $input) {
    id
    creatorId
    title
    text
  }
}
`;
export default CREATE_POST;
