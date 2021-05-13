import React, { memo } from 'react';
import { Box } from '@chakra-ui/react';

interface CellProps {
  onHoverClicked: () => void;
  onClick: () => void;
  isAlive?: boolean;
  dimension: number;
  isClicked?: boolean;
}

export const Cell: React.FC<CellProps> = memo(
  ({ onHoverClicked, onClick, isAlive, dimension }) => {
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
  },
  (oldProps, newProps) =>
    oldProps.isAlive === newProps.isAlive &&
    oldProps?.isClicked === newProps?.isClicked,
);
