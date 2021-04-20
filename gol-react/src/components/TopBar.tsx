import React from 'react';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';

import { useGame } from '../hooks/game';

export const TopBar: React.FC = () => {
  const { gameIsRunning, toggleGame } = useGame();

  const title = "Conway's Game of Life";

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="64px"
      bg="blue.400"
      align="center"
      justify="space-around"
    >
      <Heading color="white" size="lg" fontWeight="medium">
        {title}
      </Heading>

      <Flex gridGap="2">
        <Button
          type="button"
          w="100px"
          onClick={() => toggleGame()}
          size="lg"
          colorScheme={gameIsRunning ? 'red' : 'teal'}
        >
          <Text>{gameIsRunning ? 'Stop' : 'Start'}</Text>
        </Button>

        <Button
          type="button"
          w="100px"
          size="lg"
          colorScheme="blue"
          onClick={() => {
            console.log('reset game');
          }}
        >
          <Text>Reset</Text>
        </Button>
      </Flex>
    </Flex>
  );
};
