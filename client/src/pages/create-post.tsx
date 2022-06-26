import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';

import Layout from '../components/Layout';
import InputField from '../atoms/InputField';

const CreatePost: React.FC<{}> = () => {
  console.log('Hello World');

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          console.log({ values });
          // const { errors } = await createPost({
          //   variables: { input: values },
          //   update: (cache) => {
          //     cache.evict({ fieldName: 'posts' });
          //   },
          // });
          // if (!errors) {
          //   router.push('/');
          // }
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
