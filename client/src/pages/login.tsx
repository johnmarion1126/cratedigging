import React from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { Box, Button } from '@chakra-ui/react';

import toErrorMap from '../utils/toErrorMap';
import Wrapper from '../components/Wrapper';
import InputField from '../atoms/InputField';
import LOGIN from '../graphql/mutations/login';

interface registerProps {}

const Login: React.FC<registerProps> = () => {
  const router = useRouter();
  const [login] = useMutation(LOGIN);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login({ variables: { input: values } });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button type="submit" mt={4} isLoading={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
