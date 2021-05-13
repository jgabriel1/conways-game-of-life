import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  IconButton,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  VStack,
} from '@chakra-ui/react';
import {
  FaPlay as PlayIcon,
  FaPause as StopIcon,
  FaBars as MenuIcon,
} from 'react-icons/fa';

import { useGame } from '../hooks/game';

export const TopBar: React.FC = () => {
  const {
    gameIsRunning,
    toggleGame,
    generateRandomGame,
    resetGame,
  } = useGame();

  const isScreenWide = useBreakpointValue({
    base: false,
    md: true,
  });

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
          {isScreenWide ? (
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
          ) : (
            <IconButton
              colorScheme={gameIsRunning ? 'red' : 'green'}
              type="button"
              aria-label="toggle-game"
              icon={gameIsRunning ? <StopIcon /> : <PlayIcon />}
              size="lg"
              fontSize="20px"
              onClick={() => toggleGame()}
            />
          )}

          {isScreenWide ? (
            <>
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
            </>
          ) : (
            <Menu size="lg">
              <MenuButton
                as={IconButton}
                type="button"
                colorScheme="whiteAlpha"
                color="whiteAlpha.900"
                aria-label="menu-toggle"
                icon={<MenuIcon />}
                size="lg"
                fontSize="20px"
                variant="ghost"
                disabled={gameIsRunning}
              />

              <MenuList minW="128px" bg="transparent" border="none">
                <VStack>
                  <Button
                    type="button"
                    w="100px"
                    size="md"
                    colorScheme="blue"
                    onClick={() => generateRandomGame()}
                    disabled={gameIsRunning}
                  >
                    <Text fontWeight="medium">Generate</Text>
                  </Button>

                  <Button
                    type="button"
                    w="100px"
                    size="md"
                    colorScheme="blue"
                    onClick={() => resetGame()}
                    disabled={gameIsRunning}
                  >
                    <Text fontWeight="medium">Clear</Text>
                  </Button>
                </VStack>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
