import React from 'react';
import '@fontsource/red-hat-display';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import theme from '../theme';

const client = new ApolloClient({
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URI,
    fetch,
    fetchOptions: { credentials: 'include' },
  }),
  cache: new InMemoryCache(),
  credentials: 'include',
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </ApolloProvider>
);

export default MyApp;
