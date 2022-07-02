/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import type { NextPage } from 'next';
import {
  Button, Flex, Text, Heading,
} from '@chakra-ui/react';
// eslint-disable-next-line import/no-named-default
import { default as NextLink } from 'next/link';

import { useQuery } from '@apollo/client';
import Layout from '../components/Layout';
import GET_POSTS from '../graphql/queries/getPosts';

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_POSTS);

  return (
    <Layout>
      <Flex mb={4}>
        <NextLink href="/create-post">
          <Button ml="auto">
            Create Post
          </Button>
        </NextLink>
      </Flex>
      {!data && loading
        ? (<div>Loading...</div>)
        : (
          data && data.posts.map((p: any) => (!p ? null : (
            <Flex flexDir="column" key={p.id} p={5} borderWidth="1px" mb={5}>
              <Flex mb={4} w="full">
                <Heading fontSize="xl">{p.title}</Heading>
                <Text ml={3}>
                  {' '}
                  posted by
                  {' '}
                  {p.creator.username}
                </Text>
              </Flex>
              <Flex m="auto" h="50px">
                <video controls autoPlay>
                  <source src={`http://localhost:8000${p.path}`} type="audio/mpeg" />
                </video>
              </Flex>
              <Text>
                {p.text}
              </Text>
            </Flex>
          )))
        )}
    </Layout>
  );
};

export default Home;
