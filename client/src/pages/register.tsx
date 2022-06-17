import React from 'react';
import dynamic from 'next/dynamic';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { Box, Button } from '@chakra-ui/react';

import Wrapper from '../components/Wrapper';
import InputField from '../atoms/InputField';
import REGISTER from '../graphql/mutations/register';

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  const router = useRouter();
  const [register] = useMutation(REGISTER);

  return (

    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
      // eslint-disable-next-line no-unused-vars
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ variables: { input: values } });
          console.log(response);
          if (response.data?.register.errors) {
            console.log(response.data.register.errors);
          } else if (response.data?.register.user) {
            console.log(response.data.register.user);
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default dynamic(() => Promise.resolve(Register), {
  ssr: false,
});
