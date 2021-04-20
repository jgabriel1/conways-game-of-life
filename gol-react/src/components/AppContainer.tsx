import React from 'react';
import { Flex } from '@chakra-ui/react';

export const AppContainer: React.FC = ({ children }) => {
  return (
    <Flex flexDir="column" h="100vh" w="100vw">
      {children}
    </Flex>
  );
};
