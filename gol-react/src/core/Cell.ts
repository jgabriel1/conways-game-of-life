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

  // Probably move this code to game business rule
  public getNextLifeStatus(): boolean {
    const aliveNeighbors = this.neighbors.reduce(
      (accum, neighbor) => (neighbor.isAlive ? accum + 1 : accum),
      0,
    );

    if (aliveNeighbors === 3) return true;

    if (aliveNeighbors === 2) return this.isAlive;

    return false;
  }

  public clone(): Cell {
    const cloneCell = new Cell(this.isAlive);

    return cloneCell;
  }
}
