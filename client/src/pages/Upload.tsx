import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { gql, useMutation } from '@apollo/client';

const uploadFileMutation = gql`
mutation($file: Upload!) {
  uploadFile(file: $file)
}
`;

const Upload = () => {
  const [uploadFile] = useMutation(uploadFileMutation);

  const onDrop = useCallback(
    async ([file]: any) => {
      console.log(file);
      // const fileInput = {
      //   name: file.name,
      //   type: file.type,
      // };

      // console.log(fileInput);

      const res = await uploadFile({ variables: { file } });
      console.log(res);
    },
    [uploadFile],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Upload;
