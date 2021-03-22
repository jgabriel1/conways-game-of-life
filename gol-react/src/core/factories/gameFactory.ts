import { Game } from '../Game';
import { Grid } from '../Grid';
import { IGrid } from '../IGrid';

interface GameFactoryData {
  mainGridFactory?: () => IGrid;
  offGridFactory?: () => IGrid;
  refreshRate: number;
  gridHeight: number;
  gridWidth: number;
  shouldWrapAround: boolean;
}

export function gameFactory({
  mainGridFactory,
  offGridFactory,
  gridHeight,
  gridWidth,
  shouldWrapAround,
  refreshRate = 200,
}: GameFactoryData): Game {
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
