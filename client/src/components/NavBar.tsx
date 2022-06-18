import React from 'react';
// eslint-disable-next-line import/no-named-default
import { default as NextLink } from 'next/link';
import { Box, Flex, Link } from '@chakra-ui/react';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => (
  <Flex bg="lightblue" p={4}>
    <Box ml="auto">
      <NextLink href="/login">
        <Link mr={2} href="/login">Login</Link>
      </NextLink>
      <NextLink href="/register">
        <Link mr={2} href="/register">Register</Link>
      </NextLink>
    </Box>
  </Flex>
);

export default NavBar;
