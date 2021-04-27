import { Cell } from '../Cell';
import { CellChangeObserver } from './CellChangeObserver';

export class ObservableCell extends Cell {
  private cellObserver: CellChangeObserver;

  public constructor(isAlive = false, cellObserver: CellChangeObserver) {
    super(isAlive);
    this.cellObserver = cellObserver;
  }

  public setIsAlive(isAlive: boolean) {
    super.setIsAlive(isAlive);

    this.cellObserver.notifyCellChanged();
  }
}
