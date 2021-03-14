import React, { createContext, useCallback, useContext, useState } from 'react';

import { Game } from '../core/Game';

interface GameContextData {
  grid: boolean[][];
  gameIsRunning: boolean;
  toggleCell: (x: number, y: number) => void;
  toggleGame: () => void;
}

const GameContext = createContext({} as GameContextData);

const GameProvider: React.FC = ({ children }) => {
  const [grid, setGrid] = useState<boolean[][]>([]);

  const [game] = useState<Game>(() => {
    const newGame = Game.create({
      gridHeight: 20,
      gridWidth: 20,
      refreshRate: 200,
      shouldWrapAround: true,
    });

    const initialImage = newGame.getImage();

    setGrid(initialImage);

    newGame.subscribeToImageUpdate(image => setGrid(image));

    return newGame;
  });

  const [gameIsRunning, setGameIsRunning] = useState(() => {
    return game.isRunning();
  });

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
