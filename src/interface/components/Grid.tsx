import React, { useState } from 'react';
import { Flex, Grid as ChakraGrid } from '@chakra-ui/react';

import { useGame } from '../hooks/game';
import { useDimensions } from '../hooks/dimension';

import { Cell } from './Cell';

export const Grid: React.FC = () => {
  const { grid, toggleCell } = useGame();
  const { cellDimension, cellsVertical, cellsHorizontal } = useDimensions();

  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <Flex align="center" justify="center" bg="gray.100" flex="1">
      <ChakraGrid
        templateColumns={`repeat(${cellsHorizontal}, 1fr)`}
        templateRows={`repeat(${cellsVertical}, 1fr)`}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
      >
        {grid.map((row, rowIndex) =>
          row.map((isAlive, cellIndex) => (
            <Cell
              key={String(`${rowIndex}:${cellIndex}`)}
              dimension={cellDimension}
              coordinates={[cellIndex, rowIndex]}
              isAlive={isAlive}
              isClicked={isMouseDown}
              toggleCell={toggleCell}
            />
          )),
        )}
      </ChakraGrid>
    </Flex>
  );
};
