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

  // eslint-disable-next-line no-unused-vars
  const getMusicFile = async (pathName: string) => {
    // const res = await fetch(`http://localhost:8000${pathName}`);
    const res = await fetch('http://localhost:8000/music/test.mp3');
    console.log(res);
    console.log(res.body);
  };

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
          data && data.posts.map((p: any) => {
            console.log(p.path);
            getMusicFile(p.path);

            return (
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
                <video controls autoPlay>
                  <source src="http://localhost:8000/music/test.mp3" type="audio/mpeg" />
                </video>
                <Text>
                  {p.text}
                </Text>
              </Flex>
            );
          })
        )}
    </Layout>
  );
};

export default Home;
