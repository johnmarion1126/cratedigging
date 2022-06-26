import React from 'react';
import type { NextPage } from 'next';
import { Button, Flex } from '@chakra-ui/react';
// eslint-disable-next-line import/no-named-default
import { default as NextLink } from 'next/link';

import Layout from '../components/Layout';

const Home: NextPage = () => (
  <Layout>
    <Flex mb={4}>
      <NextLink href="/create-post">
        <Button ml="auto">
          Create Post
        </Button>
      </NextLink>
    </Flex>
  </Layout>
);

export default Home;
