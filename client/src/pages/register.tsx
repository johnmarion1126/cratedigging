import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';

import Wrapper from '../components/Wrapper';
import InputField from '../atoms/InputField';

interface registerProps {}

const Register: React.FC<registerProps> = () => (
  <Wrapper variant="small">
    <Formik
      initialValues={{ username: '', password: '' }}
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
            Register
          </Button>
        </Form>
      )}
    </Formik>
  </Wrapper>
);

export default Register;
