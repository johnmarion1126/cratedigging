import React from 'react';
import type { NextPage } from 'next';
import { Heading } from '@chakra-ui/react';

import Layout from '../components/Layout';

const Home: NextPage = () => (
  <Layout>
    <Heading>
      Hello World
    </Heading>
  </Layout>
);

export default Home;
