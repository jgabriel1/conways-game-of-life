import React from 'react';

import { Container } from './styles';

interface CellProps {
  onHoverClicked: () => void;
  onClick: () => void;
  isAlive?: boolean;
  dimension: number;
}

const Cell: React.FC<CellProps> = ({
  isAlive,
  onHoverClicked,
  onClick,
  dimension,
}) => {
  return (
    <Container
      onMouseEnter={onHoverClicked}
      onMouseDown={onClick}
      isAlive={!!isAlive}
      dimension={dimension}
    />
  );
};

export default Cell;
