import { gql } from '@apollo/client';

const CREATE_POST = gql`
mutation($input: PostInput!, $file: Upload!) {
  createPost(input: $input, file: $file) {
    id
    creatorId
    title
    text
  }
}
`;
export default CREATE_POST;
