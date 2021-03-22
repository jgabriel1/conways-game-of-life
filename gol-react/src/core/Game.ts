import { IGrid } from './IGrid';
import { NextLifeState } from './NextLifeState';

export class Game {
  public constructor(
    private mainGrid: IGrid,
    private offGrid: IGrid,
    private refreshRate: number,
    private timeout?: NodeJS.Timeout,
  ) {}

  public toggleCell(x: number, y: number) {
    this.mainGrid.toggleCell(x, y);
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
    }, this.refreshRate);
  }
}
