export class Cell {
  public isAlive: boolean;

  private neighbors: Cell[];

  public constructor(isAlive?: boolean) {
    this.isAlive = isAlive || false;
    this.neighbors = [];
  }

  public setIsAlive(isAlive: boolean): void {
    this.isAlive = isAlive;
  }

  public getNeighbors(): Cell[] {
    return this.neighbors;
  }

  public addNeighbor(neighbor: Cell): void {
    this.neighbors.push(neighbor);
  }

  public clone(): Cell {
    const cloneCell = new Cell(this.isAlive);

    return cloneCell;
  }
}
