from game_of_life.grid import Grid
from unittest import TestCase

from game_of_life.game import Game


class TestGame(TestCase):
    def test_glider(self):
        game = Game.glider(6)

        next_grid = game._build_next_grid()

        expected_grid = Grid(size=6, fill_random=False)
        for i, j in [(1, 0), (1, 2), (2, 1), (2, 2), (3, 1)]:
            expected_grid[i, j].set_alive()

        for item, i, j in next_grid:
            with self.subTest(f"NODE ({i}, {j})", i=i, j=j):
                expected_item = expected_grid[i, j]

                self.assertEqual(item.is_alive, expected_item.is_alive)
