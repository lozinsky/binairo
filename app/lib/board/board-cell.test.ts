import { expect, test } from 'vitest';

import type { BoardCellState } from './board-cell';

import { BoardCell, type BoardCellValue } from './board-cell';

test.each<BoardCellState>(['B', 'E', 'R'])('returns board cell from state', (state) => {
  expect(BoardCell.create(state)).toMatchSnapshot();
});

test.each([[[1, 0] as BoardCellValue], [[1, 2] as BoardCellValue], [[1, 1] as BoardCellValue]])(
  'returns board cell from value of',
  (value) => {
    expect(BoardCell.from(value)).toMatchSnapshot();
  },
);

test.each([
  [BoardCell.create('B'), BoardCell.create('B')],
  [BoardCell.create('E'), BoardCell.create('E')],
  [BoardCell.create('R'), BoardCell.create('R')],
])('returns "true" if one board cell is equal to other', (cell, other) => {
  expect(cell.equals(other)).toMatchSnapshot();
});

test.each([
  [BoardCell.create('B'), BoardCell.create('E')],
  [BoardCell.create('B'), BoardCell.create('R')],
  [BoardCell.create('E'), BoardCell.create('R')],
  [BoardCell.create('E'), BoardCell.create('B')],
  [BoardCell.create('R'), BoardCell.create('E')],
  [BoardCell.create('R'), BoardCell.create('B')],
])('returns "false" if one board cell is not equal to other', (cell, other) => {
  expect(cell.equals(other)).toMatchSnapshot();
});

test.each([
  BoardCell.create('B'),
  BoardCell.create('E'),
  BoardCell.create('R'),
  new BoardCell('fixed', 'E'),
  new BoardCell('fixed', 'R'),
  new BoardCell('fixed', 'B'),
])('returns next board cell', (cell) => {
  expect(cell.next()).toMatchSnapshot();
});

test.each([BoardCell.create('B'), BoardCell.create('E'), BoardCell.create('R')])('returns fixed board cell', (cell) => {
  expect(cell.toFixed()).toMatchSnapshot();
});

test.each([BoardCell.create('B'), BoardCell.create('E'), BoardCell.create('R')])(
  'returns board cell value of',
  (cell) => {
    expect(cell.valueOf()).toMatchSnapshot();
  },
);

test.each([BoardCell.create('B'), BoardCell.create('E'), BoardCell.create('R')])(
  'returns board cell balance',
  (cell) => {
    expect(cell.balance).toMatchSnapshot();
  },
);

test('returns "true" if board cell is empty', () => {
  expect(BoardCell.create('E').isEmpty).toMatchSnapshot();
});

test.each([BoardCell.create('R'), BoardCell.create('B')])('returns "false" if board cell is not empty', (cell) => {
  expect(cell.isEmpty).toMatchSnapshot();
});

test.each([BoardCell.create('R'), BoardCell.create('B')])('returns "true" if board cell is filled', (cell) => {
  expect(cell.isFilled).toMatchSnapshot();
});

test('returns "false" if board cell is not filled', () => {
  expect(BoardCell.create('E').isFilled).toMatchSnapshot();
});

test.each([new BoardCell('fixed', 'E'), new BoardCell('fixed', 'R'), new BoardCell('fixed', 'B')])(
  'returns "true" if board cell is fixed',
  (cell) => {
    expect(cell.isFixed).toMatchSnapshot();
  },
);

test.each([BoardCell.create('E'), BoardCell.create('R'), BoardCell.create('B')])(
  'returns "false" if board cell is not fixed',
  (cell) => {
    expect(cell.isFixed).toMatchSnapshot();
  },
);

test.each([BoardCell.create('B'), BoardCell.create('E'), BoardCell.create('R')])('returns board cell state', (cell) => {
  expect(cell.state).toMatchSnapshot();
});
