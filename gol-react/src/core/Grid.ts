import { Cell } from './Cell';
import { IGrid } from './IGrid';

export interface GridData {
  width: number;
  height: number;
  shouldWrapAround?: boolean;
}

export class Grid implements IGrid {
  public constructor(
    private grid: Cell[][],
    private height: number,
    private width: number,
    private shouldWrapAround: boolean,
  ) {
    this.buildNeighborhoodNetwork();
  }

  public getCell(x: number, y: number): Cell | null {
    if (!this.shouldWrapAround) {
      if (x >= this.width || y >= this.height || x < 0 || y < 0) {
        return null;
      }

      return this.grid[y][x];
    }

    let correctedX = x;
    let correctedY = y;

    if (x < 0) {
      correctedX = this.width - 1;
    } else if (x >= this.width) {
      correctedX = 0;
    }

    if (y < 0) {
      correctedY = this.height - 1;
    } else if (y >= this.height) {
      correctedY = 0;
    }

    return this.grid[correctedY][correctedX];
  }

  private buildNeighborhoodNetwork(): void {
    this.grid.forEach((row, j) => {
      row.forEach((cell, i) => {
        const possibleNeighbors: Array<[number, number]> = [
          [i - 1, j - 1],
          [i - 1, j],
          [i - 1, j + 1],
          [i, j - 1],
          [i, j + 1],
          [i + 1, j - 1],
          [i + 1, j],
          [i + 1, j + 1],
        ];

        possibleNeighbors.forEach(neighborIndex => {
          const neighbor = this.getCell(...neighborIndex);

          if (neighbor) cell.addNeighbor(neighbor);
        });
      });
    });
  }

  public toggleCell(x: number, y: number): void {
    const cell = this.getCell(x, y);

    cell?.setIsAlive(!cell.isAlive);
  }

  public forEach(callback: (row: Cell[], index: number) => void): void {
    this.grid.forEach(callback);
  }

  public map<T>(callback: (row: Cell[], index: number) => T): T[] {
    return this.grid.map(callback);
  }

  public static create({
    height,
    width,
    shouldWrapAround = true,
  }: GridData): Grid {
    // Fill the each slot of the grid with a new instance of Cell
    const cellArray = Array.from(Array(height), () =>
      Array.from(Array(width), () => new Cell()),
    );

    const grid = new Grid(cellArray, height, width, shouldWrapAround);

    return grid;
  }
}
