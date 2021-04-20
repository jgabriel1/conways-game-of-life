import { Box } from '@chakra-ui/react';
import React from 'react';

interface CellProps {
  onHoverClicked: () => void;
  onClick: () => void;
  isAlive?: boolean;
  dimension: number;
}

export const Cell: React.FC<CellProps> = ({
  onHoverClicked,
  onClick,
  isAlive,
  dimension,
}) => {
  return (
    <Box
      onMouseEnter={onHoverClicked}
      onMouseDown={onClick}
      border="1px"
      borderColor="whiteAlpha.300"
      borderRadius="sm"
      h={`${dimension}px`}
      w={`${dimension}px`}
      bg={isAlive ? 'gray.500' : 'gray.200'}
    />
  );
};
