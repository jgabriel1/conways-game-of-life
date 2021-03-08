import React from 'react';

import { Container, Alive, Dead } from './styles';

interface CellProps {
  isAlive?: boolean;
}

const Cell: React.FC<CellProps> = ({ isAlive }) => {
  return <Container>{isAlive ? <Alive /> : <Dead />}</Container>;
};

export default Cell;
