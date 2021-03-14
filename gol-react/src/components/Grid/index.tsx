import React, { useCallback, useState } from 'react';

import { useGame } from '../../hooks/game';

import Cell from '../Cell';

import { Container, Row } from './styles';

const Grid: React.FC = () => {
  const { grid, gameIsRunning, toggleCell, toggleGame } = useGame();

  const [isMouseDown, setIsMouseDown] = useState(false);

  const onHoverCellClicked = useCallback(
    (cellX: number, cellY: number) => isMouseDown && toggleCell(cellX, cellY),
    [isMouseDown, toggleCell],
  );

  return (
    <Container
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {grid.map((row, rowIndex) => (
        <Row key={String(rowIndex)}>
          {row.map((isAlive, cellIndex) => (
            <Cell
              key={String(`${rowIndex}:${cellIndex}`)}
              onHoverClicked={() => onHoverCellClicked(cellIndex, rowIndex)}
              onClick={() => toggleCell(cellIndex, rowIndex)}
              isAlive={isAlive}
            />
          ))}
        </Row>
      ))}

      <button type="button" onClick={() => toggleGame()}>
        {gameIsRunning ? 'Stop' : 'Start'}
      </button>
    </Container>
  );
};

export default Grid;
