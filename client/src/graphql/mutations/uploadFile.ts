import { gql } from '@apollo/client';

const UPLOAD_FILE = gql`
mutation($file: Upload!) {
  uploadFile(file: $file)
}
`;

export default UPLOAD_FILE;
