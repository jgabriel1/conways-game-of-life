import { Grid } from './Grid';

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

    private isRunning: boolean,
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

  public startGame(): void {
    this.isRunning = true;
  }

  public stopGame(): void {
    this.isRunning = false;
  }

  public run(): void {
    while (this.isRunning) {
      // Copy data from the main grid to the off grid:
      this.mainGrid.iterRows((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          const mainGridState = cell.isAlive;

          const offGridCell = this.offGrid.getCell(cellIndex, rowIndex);

          offGridCell?.setIsAlive(mainGridState);
        });
      });

      // Modify the main grid based on the off grid state and game rules
      this.offGrid.iterRows((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          const nextState = cell.getNextLifeStatus(); // this method contains the game rules

          const mainGridCell = this.mainGrid.getCell(cellIndex, rowIndex);

          mainGridCell?.setIsAlive(nextState);
        });
      });

      // Wait refresh rate
      setTimeout(() => {
        this.image = this.mainGrid.buildImage();
      }, this.refreshRate);
    }
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

    return new Game(mainGrid, offGrid, [], refreshRate, false);
  }
}