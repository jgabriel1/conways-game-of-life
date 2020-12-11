from unittest import TestCase

from game_of_life.cell import Cell
from game_of_life.grid import Grid


class TestGrid(TestCase):
    def setUp(self):
        super().setUp()

        # create an empty 6x6 grid for each test
        self.grid = Grid(6)

    def test_able_to_get_item(self):
        item = self.grid[3, 3]

        self.assertIsInstance(item, Cell)

    def test_able_to_modify_referenced_cell_state(self):
        item = self.grid[3, 3]
        item.set_alive()

        self.assertTrue(self.grid[3, 3].is_alive)

    def test_wrapping_around_vertical(self):
        self.assertIs(self.grid[0, 3], self.grid[6, 3])
        self.assertIs(self.grid[-1, 3], self.grid[5, 3])

    def test_wrapping_around_horizontal(self):
        self.assertIs(self.grid[3, 0], self.grid[3, 6])
        self.assertIs(self.grid[3, -1], self.grid[3, 5])

    def test_wrapping_around_corner(self):
        self.assertIs(self.grid[0, 0], self.grid[6, 6])
        self.assertIs(self.grid[0, 5], self.grid[6, -1])
