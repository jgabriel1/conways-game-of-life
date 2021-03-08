/* eslint-disable no-plusplus */
import { Cell } from './Cell';
import { Grid } from './Grid';

describe('Grid', () => {
  it('should create a grid for a given size', () => {
    const grid = Grid.create({ height: 200, width: 100 });

    expect(grid).toBeInstanceOf(Grid);
  });

  it('should create a grid with all empty cells by default', () => {
    const width = 500;
    const height = 200;

    const grid = Grid.create({ height, width });

    const cell = grid.getCell(0, 0);

    expect(cell).toBeInstanceOf(Cell);
  });

  it('should build a neighborhood network', () => {
    const grid = Grid.create({ height: 100, width: 100 });

    const cell = grid.getCell(50, 50);
    const neighborCell = grid.getCell(51, 50);

    expect(cell?.getNeighbors()).toContain(neighborCell);
  });

  it('should wrap around if told to', () => {
    const grid = Grid.create({
      height: 100,
      width: 200,
      shouldWrapAround: true,
    });

    // horizontal limit
    expect(grid.getCell(-1, 50)).toBe(grid.getCell(199, 50));
    expect(grid.getCell(200, 50)).toBe(grid.getCell(0, 50));

    // vertical limit
    expect(grid.getCell(100, -1)).toBe(grid.getCell(100, 99));
    expect(grid.getCell(100, 100)).toBe(grid.getCell(100, 0));

    // corner limit
    expect(grid.getCell(-1, -1)).toBe(grid.getCell(199, 99));
    expect(grid.getCell(-1, 100)).toBe(grid.getCell(199, 0));
  });

  it('should return null when getting invalid index cell when wrap is set to false', () => {
    const grid = Grid.create({
      height: 100,
      width: 200,
      shouldWrapAround: false,
    });

    // horizontal limit
    expect(grid.getCell(-1, 50)).toBe(null);
    expect(grid.getCell(200, 50)).toBe(null);

    // vertical limit
    expect(grid.getCell(100, -1)).toBe(null);
    expect(grid.getCell(100, 100)).toBe(null);

    // corner limit
    expect(grid.getCell(-1, -1)).toBe(null);
    expect(grid.getCell(-1, 100)).toBe(null);
  });
});

export {};
