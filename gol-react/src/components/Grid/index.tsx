import React from 'react';

import { useGame } from '../../hooks/game';

import Cell from '../Cell';

import { Container, Row } from './styles';

const Grid: React.FC = () => {
  const { grid, toggleCell, startGame } = useGame();

  return (
    <Container>
      {grid.map((row, rowIndex) => (
        <Row key={String(rowIndex)}>
          {row.map((isAlive, cellIndex) => (
            <Cell
              key={String(`${rowIndex}:${cellIndex}`)}
              onClick={() => toggleCell(cellIndex, rowIndex)}
              isAlive={isAlive}
            />
          ))}
        </Row>
      ))}

      <button type="button" onClick={() => startGame()}>
        Start
      </button>
    </Container>
  );
};

export default Grid;
