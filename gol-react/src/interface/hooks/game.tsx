import React, { createContext, useCallback, useContext, useState } from 'react';

import { useDimensions } from './dimension';

import { Game } from '../../core/Game';
import { createGameWithImage } from '../../core/factories/createGameWithImage';

interface GameContextData {
  grid: boolean[][];
  gameIsRunning: boolean;
  resetGame: () => void;
  generateRandomGame: () => void;
  toggleCell: (x: number, y: number) => void;
  toggleGame: () => void;
}

const GameContext = createContext({} as GameContextData);

const GameProvider: React.FC = ({ children }) => {
  const { cellsVertical, cellsHorizontal } = useDimensions();

  const [grid, setGrid] = useState<boolean[][]>([]);

  const [game, setGame] = useState<Game>(() => {
    const newGame = createGameWithImage({
      gridHeight: cellsVertical,
      gridWidth: cellsHorizontal,
      gridType: 'clear',
      onImageUpdateCallback: image => setGrid(image),
    });

    return newGame;
  });

  const [gameIsRunning, setGameIsRunning] = useState(() => {
    return game.isRunning();
  });

  const generateRandomGame = useCallback(() => {
    /*
      Return early if game is running. This could cause problems with internal
      game logic. Simply blocking it for simplicity.
    */
    if (gameIsRunning) return;

    const newGame = createGameWithImage({
      gridHeight: cellsVertical,
      gridWidth: cellsHorizontal,
      gridType: 'random',
      onImageUpdateCallback: image => setGrid(image),
    });

    setGame(newGame);
  }, [cellsHorizontal, cellsVertical, gameIsRunning]);

  const resetGame = useCallback(() => {
    /*
      Return early if game is running. This could cause problems with internal
      game logic. Simply blocking it for simplicity.
    */
    if (gameIsRunning) return;

    const newGame = createGameWithImage({
      gridHeight: cellsVertical,
      gridWidth: cellsHorizontal,
      gridType: 'clear',
      onImageUpdateCallback: image => setGrid(image),
    });

    setGame(newGame);
  }, [cellsHorizontal, cellsVertical, gameIsRunning]);

  const toggleCell = useCallback(
    (x: number, y: number) => {
      game.toggleCell(x, y);
    },
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
        resetGame,
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
