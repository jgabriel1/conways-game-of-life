import React, { createContext, useCallback, useContext, useState } from 'react';

import { Game } from '../core/Game';

interface GameContextData {
  grid: boolean[][];
  toggleCell: (x: number, y: number) => void;
  startGame: () => void;
  stopGame: () => void;
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

  const toggleCell = useCallback(
    (x: number, y: number) => game.toggleCell(x, y),
    [game],
  );

  const startGame = useCallback(() => game.run(), [game]);

  const stopGame = useCallback(() => game.stop(), [game]);

  return (
    <GameContext.Provider value={{ grid, toggleCell, startGame, stopGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

export function useGame() {
  return useContext(GameContext);
}
