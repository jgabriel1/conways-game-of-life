import { Grid } from './Grid';
import { NextLifeState } from './NextLifeState';

interface GameData {
  refreshRate: number;
  gridHeight: number;
  gridWidth: number;
  shouldWrapAround: boolean;
}

export class Game {
  private constructor(
    private mainGrid: Grid,

    private offGrid: Grid,

    private image: boolean[][],

    private refreshRate: number,

    private timeout?: NodeJS.Timeout,
  ) {}

  public subscribeToImageUpdate(callback: (image: boolean[][]) => void): void {
    this.mainGrid.setUpdateCallback(callback);
  }

  public getImage(): boolean[][] {
    this.image = this.mainGrid.buildImage();

    return this.image;
  }

  public toggleCell(x: number, y: number): void {
    this.mainGrid.toggleCell(x, y);

    this.mainGrid.buildImage();
  }

  public isRunning(): boolean {
    return !!this.timeout;
  }

  public stop(): void {
    this.timeout && clearInterval(this.timeout);
  }

  public run(): void {
    this.timeout = setInterval(() => {
      // Copy data from the main grid to the off grid:
      this.mainGrid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          const mainGridState = cell.isAlive;

          const offGridCell = this.offGrid.getCell(cellIndex, rowIndex);

          offGridCell?.setIsAlive(mainGridState);
        });
      });

      // Modify the main grid based on the off grid state and game rules
      this.offGrid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          const nextState = NextLifeState.for(cell).get();

          const mainGridCell = this.mainGrid.getCell(cellIndex, rowIndex);

          mainGridCell?.setIsAlive(nextState);
        });
      });

      this.image = this.mainGrid.buildImage();
    }, this.refreshRate);
  }

  public static create({
    gridHeight,
    gridWidth,
    shouldWrapAround,
    refreshRate = 200,
  }: GameData): Game {
    const mainGrid = Grid.create({
      height: gridHeight,
      width: gridWidth,
      shouldWrapAround,
    });

    const offGrid = Grid.create({
      height: gridHeight,
      width: gridWidth,
      shouldWrapAround,
    });

    return new Game(mainGrid, offGrid, [], refreshRate);
  }
}
