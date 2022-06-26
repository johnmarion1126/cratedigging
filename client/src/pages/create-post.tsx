import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { Box, Button } from '@chakra-ui/react';

import Layout from '../components/Layout';
import InputField from '../atoms/InputField';
import CREATE_POST from '../graphql/mutations/createPost';

const CreatePost: React.FC<{}> = () => {
  const router = useRouter();
  const [createPost] = useMutation(CREATE_POST);

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
            <InputField
              name="title"
              placeholder="title"
              label="Title"
            />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="text..."
                label="Body"
                textarea
              />
            </Box>
            <Button type="submit" mt={4} isLoading={isSubmitting}>
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreatePost;
