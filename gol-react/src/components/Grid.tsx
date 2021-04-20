import React, { useCallback, useState } from 'react';
import { Flex, Grid as ChakraGrid } from '@chakra-ui/react';
import { useGame } from '../hooks/game';
import { useDimensions } from '../hooks/dimension';
import { Cell } from './Cell';

export const Grid: React.FC = () => {
  const { grid, toggleCell } = useGame();
  const { cellDimension, cellsVertical, cellsHorizontal } = useDimensions();

  const [isMouseDown, setIsMouseDown] = useState(false);

  const onHoverCellClicked = useCallback(
    (cellX: number, cellY: number) => isMouseDown && toggleCell(cellX, cellY),
    [isMouseDown, toggleCell],
  );

  return (
    <Flex align="center" justify="center" bg="gray.100" flex="1">
      <ChakraGrid
        templateColumns={`repeat(${cellsHorizontal}, 1fr)`}
        templateRows={`repeat(${cellsVertical}, 1fr)`}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        {grid.map((row, rowIndex) =>
          row.map((isAlive, cellIndex) => (
            <Cell
              key={String(`${rowIndex}:${cellIndex}`)}
              onHoverClicked={() => onHoverCellClicked(cellIndex, rowIndex)}
              onClick={() => toggleCell(cellIndex, rowIndex)}
              isAlive={isAlive}
              dimension={cellDimension}
            />
          )),
        )}
      </ChakraGrid>
    </Flex>
  );
};
