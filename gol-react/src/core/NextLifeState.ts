import { Cell } from './Cell';

export class NextLifeState {
  private constructor(private cell: Cell) {}

  public get(): boolean {
    const aliveNeighbors = this.cell
      .getNeighbors()
      .reduce((accum, neighbor) => (neighbor.isAlive ? accum + 1 : accum), 0);

    if (aliveNeighbors === 3) return true;

    if (aliveNeighbors === 2) return this.cell.isAlive;

    return false;
  }

  public static for(cell: Cell): NextLifeState {
    return new NextLifeState(cell);
  }
}
