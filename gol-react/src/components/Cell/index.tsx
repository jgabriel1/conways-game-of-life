import React from 'react';

import { Container, Alive, Dead } from './styles';

interface CellProps {
  onClick: () => void;
  isAlive?: boolean;
}

const Cell: React.FC<CellProps> = ({ isAlive, onClick }) => {
  return (
    <Container onClick={onClick}>{isAlive ? <Alive /> : <Dead />}</Container>
  );
};

export default Cell;
