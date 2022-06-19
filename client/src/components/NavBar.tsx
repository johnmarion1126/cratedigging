import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-named-default
import { default as NextLink } from 'next/link';
import {
  Box, Button, Flex, Heading, Link,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import GET_USER_BY_QID from '../graphql/queries/getUserByQid';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { data, loading } = useQuery(GET_USER_BY_QID);

  let body = null;

  useEffect(() => {
    console.log(data);
  }, [loading]);

  if (loading) {
    body = null;
  } else if (!data?.getUserByQid) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2} href="/login">Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={2} href="/register">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>
          {data.getUserByQid.username}
        </Box>
        <Button
          variant="link"
        >
          Log Out
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={2} position="sticky" top={0} bg="lightblue" p={4} align="center">
      <NextLink href="/">
        <Heading>cratedigging</Heading>
      </NextLink>
      <Box ml="auto">
        {body}
      </Box>
    </Flex>
  );
};

export default NavBar;
