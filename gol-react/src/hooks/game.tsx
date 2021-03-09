import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { Game } from '../core/Game';

interface GameContextData {
  grid: boolean[][];
  toggleCell: (x: number, y: number) => void;
  startGame: () => void;
}

type GameReducerState = { game: Game | null; grid: boolean[][] };

type GameReducer = React.Reducer<
  GameReducerState,
  { type: 'UPDATE_GRID'; image: boolean[][] }
>;

const GameContext = createContext({} as GameContextData);

const GameProvider: React.FC = ({ children }) => {
  const [{ game, grid }, gameDispatch] = useReducer<
    GameReducer,
    GameReducerState
  >(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE_GRID':
          return {
            ...state,
            grid: action.image,
          };
        default:
          return state;
      }
    },
    { game: null, grid: [] },
    () => {
      const newGame = Game.create({
        gridHeight: 20,
        gridWidth: 20,
        refreshRate: 200,
        shouldWrapAround: true,
      });

      const initialImage = newGame.getImage();

      newGame.subscribeToImageUpdate(image => {
        gameDispatch({ type: 'UPDATE_GRID', image });
      });

      return { game: newGame, grid: initialImage };
    },
  );

  const toggleCell = useCallback(
    (x: number, y: number) => {
      game?.toggleCell(x, y);
    },
    [game],
  );

  const startGame = useCallback(() => {
    game?.run();
  }, [game]);

  return (
    <GameContext.Provider
      value={{
        grid,
        toggleCell,
        startGame,
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
