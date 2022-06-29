import React, { useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import { Box, Button, FormLabel } from '@chakra-ui/react';

import Layout from '../components/Layout';
import InputField from '../atoms/InputField';
import UploadInput from '../components/UploadInput';
import CREATE_POST from '../graphql/mutations/createPost';
import UPLOAD_FILE from '../graphql/mutations/uploadFile';

const CreatePost: React.FC<{}> = () => {
  const router = useRouter();
  const [createPost] = useMutation(CREATE_POST);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const [file, setFile] = useState<File>();

  const onDrop = useCallback(
    ([fileInput]: any) => {
      setFile(fileInput);
    },
    [uploadFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { errors } = await createPost({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' });
            },
          });
          if (!errors) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormLabel
              htmlFor="upload"
              mt={4}
            >
              Upload
            </FormLabel>
            <Button
              w="full"
              p={10}
              borderWidth={1}
              borderRadius="md"
              bg="gray.100"
              textAlign="center"
              color="gray.500"
              fontWeight="light"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <UploadInput
                file={file}
                isDragActive={isDragActive}
              />
            </Button>
            <Box mt={4}>
              <InputField
                name="title"
                placeholder="title"
                label="Title"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="text..."
                label="Body"
                textarea
              />
            </Box>
            <Button
              type="submit"
              mt={5}
              ml={220}
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreatePost;
