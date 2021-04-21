import React, { createContext, useCallback, useContext, useState } from 'react';

import { useDimensions } from './dimension';

import { Game } from '../core/Game';
import { GridWithImage } from '../core/adapters/GridWithImage';
import { gameFactory } from '../core/factories/gameFactory';

interface GameContextData {
  grid: boolean[][];
  gameIsRunning: boolean;
  generateRandomGame: () => void;
  toggleCell: (x: number, y: number) => void;
  toggleGame: () => void;
}

const GameContext = createContext({} as GameContextData);

const GameProvider: React.FC = ({ children }) => {
  const { cellsVertical, cellsHorizontal } = useDimensions();

  const [grid, setGrid] = useState<boolean[][]>([]);

  const [game, setGame] = useState<Game>(() => {
    const gridWithImage = GridWithImage.create({
      height: cellsVertical,
      width: cellsHorizontal,
      shouldWrapAround: true,
      onImageUpdateCallback: image => setGrid(image),
    });

    setGrid(gridWithImage.getImage());

    const newGame = gameFactory({
      mainGridFactory: () => gridWithImage,
      gridHeight: cellsVertical,
      gridWidth: cellsHorizontal,
      refreshRate: 200,
      shouldWrapAround: true,
    });

    return newGame;
  });

  const [gameIsRunning, setGameIsRunning] = useState(() => {
    return game.isRunning();
  });

  const generateRandomGame = useCallback(() => {
    const gridWithImage = GridWithImage.createRandom({
      height: cellsVertical,
      width: cellsHorizontal,
      shouldWrapAround: true,
      onImageUpdateCallback: image => setGrid(image),
    });

    setGrid(gridWithImage.getImage());

    const newGame = gameFactory({
      mainGridFactory: () => gridWithImage,
      gridHeight: cellsVertical,
      gridWidth: cellsHorizontal,
      refreshRate: 200,
      shouldWrapAround: true,
    });

    setGame(newGame);
  }, [cellsHorizontal, cellsVertical]);

  const toggleCell = useCallback(
    (x: number, y: number) => game.toggleCell(x, y),
    [game],
  );

  const toggleGame = useCallback(() => {
    game.isRunning() ? game.stop() : game.run();

    setGameIsRunning(current => !current);
  }, [game]);

  return (
    <GameContext.Provider
      value={{
        grid,
        gameIsRunning,
        generateRandomGame,
        toggleCell,
        toggleGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

export function useGame() {
  return useContext(GameContext);
}
