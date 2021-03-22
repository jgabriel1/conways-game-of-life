import { Cell } from '../Cell';
import { Grid, GridData } from '../Grid';
import { IGrid } from '../IGrid';
import { CellChangeObserver } from './CellChangeObserver';
import { ObservableCell } from './ObservableCell';

export interface GridWithImageData extends GridData {
  onImageUpdateCallback?: (image: boolean[][]) => void;
}

export class GridWithImage implements IGrid {
  private constructor(
    private grid: Grid,
    private image: boolean[][],
    private cellChangeObserver: CellChangeObserver,
    private onImageUpdateCallback?: (image: boolean[][]) => void,
  ) {
    this.buildImage();
  }

  public getImage() {
    return this.image;
  }

  private executeCallback() {
    if (this.onImageUpdateCallback) this.onImageUpdateCallback(this.image);
  }

  private buildImage() {
    this.image = this.grid.map(row => row.map(cell => cell.isAlive));
  }

  private rebuildImage() {
    this.buildImage();

    this.executeCallback();

    this.cellChangeObserver.resetCellChanged();
  }

  public getCell(x: number, y: number): Cell | null {
    return this.grid.getCell(x, y);
  }

  public toggleCell(x: number, y: number): void {
    this.grid.toggleCell(x, y);

    const currentValue = this.image[y][x];

    this.image[y][x] = !currentValue;

    this.rebuildImage();
  }

  public forEach(callback: (row: Cell[], index: number) => void): void {
    this.grid.forEach(callback);

    const anyCellChanged = this.cellChangeObserver.getCellChanged();

    if (anyCellChanged) {
      this.rebuildImage();
    }
  }

  public map<T>(callback: (row: Cell[], index: number) => T): T[] {
    const mappedGrid = this.grid.map<T>(callback);

    const anyCellChanged = this.cellChangeObserver.getCellChanged();

    if (anyCellChanged) {
      this.rebuildImage();
    }

    return mappedGrid;
  }

  public static create({
    height,
    width,
    shouldWrapAround = true,
    onImageUpdateCallback,
  }: GridWithImageData): GridWithImage {
    const cellChangeObserver = new CellChangeObserver();

    const cellArray = Array.from(Array(height), () =>
      Array.from(
        Array(width),
        () => new ObservableCell(false, cellChangeObserver),
      ),
    );

    const grid = new Grid(cellArray, height, width, shouldWrapAround);

    const gridWithImage = new GridWithImage(
      grid,
      [],
      cellChangeObserver,
      onImageUpdateCallback,
    );

    return gridWithImage;
  }
}
