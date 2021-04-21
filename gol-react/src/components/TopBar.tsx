import React from 'react';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';

import { useGame } from '../hooks/game';

export const TopBar: React.FC = () => {
  const { gameIsRunning, toggleGame, generateRandomGame } = useGame();

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
          colorScheme={gameIsRunning ? 'red' : 'green'}
        >
          <Text
            fontWeight="medium"
            color={gameIsRunning ? 'gray.800' : 'inherit'}
          >
            {gameIsRunning ? 'Stop' : 'Start'}
          </Text>
        </Button>

        <Button
          type="button"
          w="100px"
          size="lg"
          colorScheme="blue"
          onClick={() => generateRandomGame()}
        >
          <Text fontWeight="medium">Generate</Text>
        </Button>
      </Flex>
    </Flex>
  );
};
