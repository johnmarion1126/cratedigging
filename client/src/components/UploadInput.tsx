import React from 'react';
import { Text } from '@chakra-ui/react';

interface UploadInputInterface {
  file: File | undefined;
  isDragActive: boolean
}

const UploadInput: React.FC<UploadInputInterface> = ({ file, isDragActive }) => {
  if (file) {
    return <Text>Uploaded!</Text>;
  } if (isDragActive) {
    return <Text>Drop the file here</Text>;
  }
  return (
    <Text>
      Drag file here or click to select a file
    </Text>
  );
};

export default UploadInput;
