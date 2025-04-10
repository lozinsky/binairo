import { assert, expect, test } from 'vitest';

import type { BoardCellState } from './board-cell';

import { BoardLine, type BoardLineValue } from './board-line';

test.each([4, 6, 8, 10])('returns blank board line', (size) => {
  expect(BoardLine.blank(size)).toMatchSnapshot();
});

test.each<[BoardCellState[]]>([[['B', 'B', 'R', 'E']], [['B', 'R', 'E']]])('returns board from states', (states) => {
  expect(BoardLine.create(states)).toMatchSnapshot();
});

test.each([
  [
    [
      [1, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ] as BoardLineValue,
  ],
  [
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ] as BoardLineValue,
  ],
])('returns board line from value of', (value) => {
  expect(BoardLine.from(value)).toMatchSnapshot();
});

test.each([BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'R', 'E'])])(
  'returns board line iterator',
  (line) => {
    expect(Array.from(line)).toMatchSnapshot();
  },
);

test.each([
  [BoardLine.create(['B', 'R', 'E']), -1],
  [BoardLine.create(['B', 'R', 'E']), 0],
  [BoardLine.create(['B', 'R', 'E']), 1],
  [BoardLine.create(['B', 'R', 'E']), 2],
  [BoardLine.create(['B', 'R', 'E']), 3],
])('returns board cell at index', (line, index) => {
  expect(line.at(index)).toMatchSnapshot();
});

test.each([BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'R', 'E'])])(
  'returns board line entries',
  (line) => {
    expect(Array.from(line.entries())).toMatchSnapshot();
  },
);

test.each([
  [BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'B', 'R', 'E'])],
  [BoardLine.create(['B', 'R', 'E']), BoardLine.create(['B', 'R', 'E'])],
])('returns "true" if one board line is equal to other', (line, other) => {
  expect(line.equals(other)).toMatchSnapshot();
});

test.each([
  [BoardLine.create(['B', 'B', 'E', 'E']), BoardLine.create(['B', 'B', 'R', 'E'])],
  [BoardLine.create(['B', 'E', 'E']), BoardLine.create(['B', 'R', 'E'])],
])('returns "false" if one board line is not equal to other', (line, other) => {
  expect(line.equals(other)).toMatchSnapshot();
});

test.each([
  [BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'B', 'E', 'E'])],
  [BoardLine.create(['B', 'R', 'E']), BoardLine.create(['B', 'E', 'E'])],
])('returns "true" if one board line is include other', (line, other) => {
  expect(line.includes(other)).toMatchSnapshot();
});

test.each([
  [BoardLine.create(['E', 'R', 'B', 'B']), BoardLine.create(['R', 'E', 'B', 'B'])],
  [BoardLine.create(['E', 'R', 'R', 'B']), BoardLine.create(['E', 'E', 'B', 'B'])],
  [BoardLine.create(['E', 'R', 'R', 'B']), BoardLine.create(['E', 'E', 'B'])],
])('returns "false" if one board line is not include other', (line, other) => {
  expect(line.includes(other)).toMatchSnapshot();
});

test.each([
  [BoardLine.create(['B', 'R', 'E']), -1],
  [BoardLine.create(['B', 'R', 'E']), 0],
  [BoardLine.create(['B', 'R', 'E']), 1],
  [BoardLine.create(['B', 'R', 'E']), 2],
])('returns board cell index of', (line, index) => {
  const cell = line.at(index);

  assert(cell !== undefined);

  expect(line.indexOf(cell)).toMatchSnapshot();
});

test.each([BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'R', 'E'])])(
  'returns board line keys',
  (line) => {
    expect(Array.from(line.keys())).toMatchSnapshot();
  },
);

test.each<[BoardLine, BoardCellState]>([
  [BoardLine.create(['B', 'B', 'R', 'E']), 'E'],
  [BoardLine.create(['B', 'B', 'R', 'E']), 'R'],
  [BoardLine.create(['B', 'B', 'R', 'E']), 'B'],
])('returns length of board state in board line', (line, state) => {
  expect(line.lengthOf(state)).toMatchSnapshot();
});

test.each([BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'R', 'E'])])('rotates board line', (line) => {
  expect(line.rotate()).toMatchSnapshot();
});

test.each([
  [BoardLine.create(['B', 'R', 'E']), -1, undefined],
  [BoardLine.create(['B', 'R', 'E']), 0, undefined],
  [BoardLine.create(['B', 'R', 'E']), 1, undefined],
  [BoardLine.create(['B', 'R', 'E']), 2, undefined],
  [BoardLine.create(['B', 'R', 'E']), 3, undefined],
  [BoardLine.create(['B', 'R', 'E']), 0, -1],
  [BoardLine.create(['B', 'R', 'E']), 0, 0],
  [BoardLine.create(['B', 'R', 'E']), 0, 1],
  [BoardLine.create(['B', 'R', 'E']), 0, 2],
  [BoardLine.create(['B', 'R', 'E']), 0, 3],
])('slices board line', (line, start, end) => {
  expect(line.slice(start, end)).toMatchSnapshot();
});

test.each([BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'R', 'E'])])(
  'returns board line value of',
  (line) => {
    expect(line.valueOf()).toMatchSnapshot();
  },
);

test.each([
  BoardLine.create(['E', 'E', 'E', 'E']),
  BoardLine.create(['R', 'R', 'B', 'B']),
  BoardLine.create(['R', 'R', 'R', 'B']),
  BoardLine.create(['R', 'B', 'B', 'B']),
])('returns board line balance', (line) => {
  expect(line.balance).toMatchSnapshot();
});

test.each([BoardLine.create(['E', 'E', 'E', 'E']), BoardLine.create(['E', 'E', 'E'])])(
  'returns "true" if board line is empty',
  (line) => {
    expect(line.isEmpty).toMatchSnapshot();
  },
);

test.each([BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'R', 'E'])])(
  'returns "false" if board line is not empty',
  (line) => {
    expect(line.isEmpty).toMatchSnapshot();
  },
);

test.each([BoardLine.create(['B', 'B', 'R', 'R']), BoardLine.create(['B', 'R', 'R'])])(
  'returns "true" if board line is filled',
  (line) => {
    expect(line.isFilled).toMatchSnapshot();
  },
);

test.each([BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'R', 'E'])])(
  'returns "false" if board line is not filled',
  (line) => {
    expect(line.isFilled).toMatchSnapshot();
  },
);

test.each([BoardLine.create(['B', 'B', 'R', 'E']), BoardLine.create(['B', 'R', 'E'])])(
  'returns board line length',
  (line) => {
    expect(line.length).toMatchSnapshot();
  },
);

test.each([
  BoardLine.create(['E', 'E', 'E', 'E']),
  BoardLine.create(['E', 'E', 'B', 'B']),
  BoardLine.create(['R', 'R', 'B', 'B']),
])('returns board line progress', (line) => {
  expect(line.progress).toMatchSnapshot();
});
