# John Conway's Game of Life

This project is an implementation of the **Game of Life** automaton. The interface was built using **ReactJS** and the *core* game rules were implemented using an _object oriented_ approach with **TypeScript**.

To try it out visit [here](https://jgabriel1.github.io/conways-game-of-life), **generate** a random grid, or draw one out yourself and **start** the simulation to see the game running.

## Rules

The simulation runs based on very simple rules:

* It is given a grid of indefinite dimensions (this is achieved in this project by _wrapping_ the grid around so that the ends always meet);

* Each cell in the grid can either be **dead** or **alive** and has 8 (eight) neighbors, which are all the cells adjacent it in any direction;

* Given an initial state for the grid cells, the simulation can start and the cells will update themselves based on a set of rules. For a given **generation**, the next one is determined by these rules:
  - If a cell is not alive and has exactly 3 live neighbors, it becomes alive, otherwise it stays as is;

  - If a cell is alive and has 2 or 3 live neighbors, it _survives_. In other words, it's state doesn't change and it stays alive;

  - If a cell is alive and has less than 2 live neighbors, it _dies_ due to _isolation_;

  - If a cell is alive and has more than 3 live neighbors, it _dies_ due to _overpopulation_.

Based on these simple rules, a very complicated system can be created for which there is no mathematical way of proving wether it will go on forever or end completely in 100 or 1000 generations.

## Inspiration

Inspired by [this video](https://youtu.be/R9Plq-D1gEk) I watched a few years ago where Conway explains how he came up with the game and what is it's mathematical purpose, I thought it would be a cool thing to program an implementation myself.
