import { Game } from '../Game';
import { Grid } from '../Grid';
import { IGrid } from '../IGrid';

export interface CreateGameOptions {
  gridHeight: number;
  gridWidth: number;
  mainGridFactory?: () => IGrid;
  offGridFactory?: () => IGrid;
  refreshRate?: number;
  shouldWrapAround?: boolean;
}

export function createGame({
  mainGridFactory,
  offGridFactory,
  gridHeight,
  gridWidth,
  shouldWrapAround = true,
  refreshRate = 200,
}: CreateGameOptions): Game {
  const mainGrid = mainGridFactory
    ? mainGridFactory()
    : Grid.create({
        height: gridHeight,
        width: gridWidth,
        shouldWrapAround,
      });

  const offGrid = offGridFactory
    ? offGridFactory()
    : Grid.create({
        height: gridHeight,
        width: gridWidth,
        shouldWrapAround,
      });

  return new Game(mainGrid, offGrid, refreshRate);
}
