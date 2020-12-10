from unittest import TestCase

from .game import Game


class TestGame(TestCase):
    def test_neighbors_count(self):
        game = Game(6, random_fill=False)

        for i, j in [(0, 1), (1, 2), (2, 0), (2, 1), (2, 2)]:
            game._grid[i][j].set_alive()

        neighbors = game._get_alive_neighbors(0, 2)

        self.assertEqual(neighbors, 1)

    def test_glider(self):
        game = Game.glider(6)

        next_grid = game._build_next_grid()

        expected_grid = Game(size=6, random_fill=False)._grid
        for i, j in [(1, 0), (1, 2), (2, 1), (2, 2), (3, 1)]:
            expected_grid[i][j].set_alive()

        for i, row in enumerate(next_grid):
            for j, item in enumerate(row):
                with self.subTest(f"NODE ({i}, {j})", i=i, j=j):
                    expected_item = expected_grid[i][j]

                    self.assertEqual(item.is_alive, expected_item.is_alive)
