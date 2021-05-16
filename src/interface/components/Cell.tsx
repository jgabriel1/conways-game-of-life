import React, { memo } from 'react';
import { Box } from '@chakra-ui/react';

interface CellProps {
  dimension: number;
  coordinates: [number, number];
  isAlive?: boolean;
  isClicked?: boolean;
  toggleCell: (x: number, y: number) => void;
}

export const Cell: React.FC<CellProps> = memo(
  ({ dimension, isAlive, coordinates: [x, y], toggleCell, isClicked }) => {
    return (
      <Box
        onMouseEnter={() => isClicked && toggleCell(x, y)}
        onMouseDown={() => toggleCell(x, y)}
        border="1px"
        borderColor="whiteAlpha.300"
        borderRadius="sm"
        h={`${dimension}px`}
        w={`${dimension}px`}
        bg={isAlive ? 'gray.500' : 'gray.200'}
        __css={{ userSelect: 'none' }}
      />
    );
  },
  (oldProps, newProps) =>
    oldProps.isAlive === newProps.isAlive &&
    oldProps.isClicked === newProps.isClicked,
);
