import React from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { Box, Button } from '@chakra-ui/react';

// eslint-disable-next-line no-unused-vars
import toErrorMap from '../utils/toErrorMap';
import Wrapper from '../components/Wrapper';
import InputField from '../atoms/InputField';

interface registerProps {}

const Login: React.FC<registerProps> = () => {
  // eslint-disable-next-line no-unused-vars
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        // eslint-disable-next-line no-unused-vars
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
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
