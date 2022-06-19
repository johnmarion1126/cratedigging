import { gql } from '@apollo/client';

const GET_USER_BY_QID = gql`
query {
  getUserByQid {
    id
    username
  }
}
`;

export default GET_USER_BY_QID;
