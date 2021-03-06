import React from 'react';
import dynamic from 'next/dynamic';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { Box, Button } from '@chakra-ui/react';

import Layout from '../components/Layout';
import toErrorMap from '../utils/toErrorMap';
import InputField from '../atoms/InputField';
import LOGIN from '../graphql/mutations/login';
import GET_USER_BY_QID from '../graphql/queries/getUserByQid';

interface registerProps {}

const Login: React.FC<registerProps> = () => {
  const router = useRouter();
  const [login] = useMutation(LOGIN);

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: { input: values },
            update: (cache, { data }) => {
              cache.writeQuery({
                query: GET_USER_BY_QID,
                data: {
                  __typename: 'Query',
                  getUserByQid: data?.login.user,
                },
              });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
              data-testid="username-form"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                data-testid="password-form"
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              data-testid="login-btn"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Login), {
  ssr: false,
});
