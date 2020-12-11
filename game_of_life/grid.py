from random import randint

from .cell import Cell


class Grid:
    def __init__(self, size, fill_random=False):
        self._size = size
        self._grid = [
            [
                Cell(
                    randint(0, 1) if fill_random else 0,
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

    def __iter__(self):
        for i, row in enumerate(self._grid):
            for j, item in enumerate(row):
                yield item, i, j

    def __getitem__(self, position):
        column, row = position

        return self.get_cell(column, row)

    def __len__(self):
        return self._size

    def _check_wrap_around(self, index):
        if index < 0:
            return len(self) - 1
        elif index >= len(self):
            return 0

        return index

    def get_cell(self, column, row):

        _column = self._check_wrap_around(column)
        _row = self._check_wrap_around(row)

        return self._grid[_row][_column]
