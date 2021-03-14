import React from 'react';

import { Container, Alive, Dead } from './styles';

interface CellProps {
  onHoverClicked: () => void;
  onClick: () => void;
  isAlive?: boolean;
}

const Cell: React.FC<CellProps> = ({ isAlive, onHoverClicked, onClick }) => {
  return (
    <Container onMouseEnter={onHoverClicked} onMouseDown={onClick}>
      {isAlive ? <Alive /> : <Dead />}
    </Container>
  );
};

export default Cell;
