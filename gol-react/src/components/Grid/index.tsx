import React from 'react';

import { useGame } from '../../hooks/game';

import Cell from '../Cell';

import { Container, Row } from './styles';

const Grid: React.FC = () => {
  const { grid, toggleCell } = useGame();

  return (
    <Container>
      {grid.map(row => (
        <Row>
          {row.map(isAlive => (
            <Cell isAlive={isAlive} />
          ))}
        </Row>
      ))}

      <button type="button" onClick={() => toggleCell(15, 15)}>
        Click
      </button>
    </Container>
  );
};

export default Grid;
