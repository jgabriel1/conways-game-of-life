import { Cell } from './Cell';

export interface IGrid {
  getCell(x: number, y: number): Cell | null;
  toggleCell(x: number, y: number): void;
  forEach(callback: (row: Cell[], index: number) => void): void;
  map<T>(callback: (row: Cell[], index: number) => T): T[];
}
