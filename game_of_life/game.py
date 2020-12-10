from os import system
from random import randint
from time import sleep

from .cell import Cell


class Game:
    def __init__(self, size=10, random_fill=True):
        self._size = size
        self._grid = [
            [
                Cell(
                    randint(0, 1) if random_fill else 0,
                )
                for _ in range(size)
            ]
            for _ in range(size)
        ]

    def __repr__(self):
        string_form = ""

        for row in self._grid:
            for cell in row:
                string_form += str(cell)

            string_form += "\n"

        string_form += "\n\n\n"

        return string_form

    def _get_cell(self, column, row):
        if column < 0 or row < 0:
            raise IndexError

        return self._grid[row][column]

    def _get_alive_neighbors(self, column, row):
        """
        (0, 2)

        i -> -1, 0, 1
        j ->  1, 2, 3

          0 1 2 3
        0 0 1 0 0
        1 0 0 1 0
        2 1 1 1 0
        3 0 0 0 0
        """

        alive_neighbors = 0

        get_neighbors = lambda x: (x - 1, x, x + 1)

        for i in get_neighbors(column):
            for j in get_neighbors(row):
                if i == column and j == row:
                    continue

                try:
                    neighbor = self._get_cell(i, j)

                    if neighbor.is_alive:
                        alive_neighbors += 1
                except IndexError:
                    continue

        return alive_neighbors

    def _check_cell(self, column, row):
        alive_neighbors = self._get_alive_neighbors(column, row)
        cell_is_alive = self._get_cell(column, row).is_alive

        if alive_neighbors == 3:
            return True
        elif alive_neighbors == 2:
            return cell_is_alive
        else:
            return False

    def _build_next_grid(self):
        next_grid = []

        for i in range(self._size):
            row = []

            for j in range(self._size):
                cell = Cell()

                if self._check_cell(j, i):
                    cell.set_alive()
                else:
                    cell.set_dead()

                row.append(cell)

            next_grid.append(row)

        return next_grid

    def run(self):
        while True:
            next_grid = self._build_next_grid()

            system("cls")

            print(self)
            sleep(0.1)

            self._grid = next_grid

    @classmethod
    def glider(cls, size=10):
        glider_cells = [(0, 1), (1, 2), (2, 0), (2, 1), (2, 2)]

        game = cls(size, random_fill=False)

        for i, j in glider_cells:
            game._grid[i][j].set_alive()

        return game
