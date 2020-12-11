from os import system
from time import sleep

from game_of_life.grid import Grid


class Game:
    def __init__(self, size=10, random_fill=True):
        self._size = size
        self._state = Grid(size, random_fill)

    def __repr__(self):
        return str(self._state)

    def _get_alive_neighbors(self, column, row):
        alive_neighbors = 0

        get_neighbors = lambda x: (x - 1, x, x + 1)

        for i in get_neighbors(column):
            for j in get_neighbors(row):
                if i == column and j == row:
                    continue

                neighbor = self._state[i, j]

                if neighbor.is_alive:
                    alive_neighbors += 1

        return alive_neighbors

    def _check_cell(self, column, row):
        alive_neighbors = self._get_alive_neighbors(column, row)
        cell_is_alive = self._state[column, row].is_alive

        if alive_neighbors == 3:
            return True
        elif alive_neighbors == 2:
            return cell_is_alive
        else:
            return False

    def _build_next_grid(self):
        next_grid = Grid(self._size)

        for _, i, j in self._state:
            next_grid_cell = next_grid[i, j]

            if self._check_cell(i, j):
                next_grid_cell.set_alive()
            else:
                next_grid_cell.set_dead()

        return next_grid

    def run(self):
        while True:
            next_grid = self._build_next_grid()

            system("cls")

            print(self)
            sleep(0.1)

            self._state = next_grid

    @classmethod
    def glider(cls, size=10):
        glider_cells = [(0, 1), (1, 2), (2, 0), (2, 1), (2, 2)]

        game = cls(size, random_fill=False)

        for i, j in glider_cells:
            game._state[i, j].set_alive()

        return game
