import { Cell } from './Cell';
import { IGrid } from './IGrid';

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
    if (this.timeout) {
      clearInterval(this.timeout);

      delete this.timeout;
    }
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
          const nextState = Game.getNextLifeStatus(cell);

          const mainGridCell = this.mainGrid.getCell(cellIndex, rowIndex);

          mainGridCell?.setIsAlive(nextState);
        });
      });
    }, this.refreshRate);
  }

  private static getNextLifeStatus(cell: Cell): boolean {
    const aliveNeighbors = cell
      .getNeighbors()
      .reduce((accum, neighbor) => (neighbor.isAlive ? accum + 1 : accum), 0);

    if (aliveNeighbors === 3) return true;

    if (aliveNeighbors === 2) return cell.isAlive;

    return false;
  }
}
