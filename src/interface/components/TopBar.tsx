import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

import { useGame } from '../hooks/game';

export const TopBar: React.FC = () => {
  const {
    gameIsRunning,
    toggleGame,
    generateRandomGame,
    resetGame,
  } = useGame();

  const title = "Conway's Game of Life";

  return (
    <Box bg="blue.400" px="24px" w="100%">
      <Flex
        as="header"
        w="100%"
        maxW={1180}
        h="64px"
        mx="auto"
        align="center"
        justify="space-between"
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
            disabled={gameIsRunning}
          >
            <Text fontWeight="medium">Generate</Text>
          </Button>

          <Button
            type="button"
            w="100px"
            size="lg"
            colorScheme="blue"
            variant="solid"
            onClick={() => resetGame()}
            disabled={gameIsRunning}
          >
            <Text fontWeight="medium">Clear</Text>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
