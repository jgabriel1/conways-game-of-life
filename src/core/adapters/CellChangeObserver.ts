export class CellChangeObserver {
  private cellChanged: boolean;

  public constructor(cellChanged = false) {
    this.cellChanged = cellChanged;
  }

  public getCellChanged(): boolean {
    return this.cellChanged;
  }

  public notifyCellChanged() {
    this.cellChanged = true;
  }

  public resetCellChanged() {
    this.cellChanged = false;
  }
}
