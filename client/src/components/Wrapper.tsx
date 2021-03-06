import React from 'react';
import { Box } from '@chakra-ui/react';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant
  children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => (
  <Box mt={8} mx="auto" maxW={variant === 'regular' ? '800px' : '400px'} w="100%" px={8}>
    { children }
  </Box>
);

export default Wrapper;
