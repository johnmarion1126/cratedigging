import React from 'react';
import {
  Box, Button, Flex, Heading, Link,
} from '@chakra-ui/react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
// eslint-disable-next-line import/no-named-default
import { default as NextLink } from 'next/link';

import GET_USER_BY_QID from '../graphql/queries/getUserByQid';
import LOGOUT from '../graphql/mutations/logout';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { data, loading } = useQuery(GET_USER_BY_QID);
  const [logout, { loading: logoutLoading }] = useMutation(LOGOUT);
  const apolloClient = useApolloClient();

  const handleLogOut = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  let body = null;

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
          isLoading={logoutLoading}
          onClick={handleLogOut}
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
