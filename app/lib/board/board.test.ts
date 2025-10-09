import { expect, test, vi } from 'vitest';

import { MatrixSelection } from '~/lib/matrix';

import type { BoardCellState } from './board-cell';
import type { BoardCell } from './board-cell';

import { Board, type BoardValue } from './board';
import { BoardLine } from './board-line';

test.each([4, 6, 8, 10])('returns blank board', (size) => {
  expect(Board.blank(size)).toMatchSnapshot();
});

test.each<[BoardCellState[][]]>([
  [
    [
      ['B', 'R', 'B', 'R'],
      ['R', 'B', 'R', 'B'],
      ['R', 'B', 'B', 'R'],
      ['B', 'R', 'R', 'B'],
    ],
  ],
  [
    [
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ],
  ],
])('returns board from states', (states) => {
  expect(Board.create(states)).toMatchSnapshot();
});

test.each([
  [
    [
      [
        [1, 0],
        [1, 1],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 0],
        [1, 1],
        [1, 0],
      ],
      [
        [1, 1],
        [1, 0],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 1],
        [1, 0],
      ],
    ] as BoardValue,
  ],
  [
    [
      [
        [1, 0],
        [1, 1],
        [1, 0],
      ],
      [
        [1, 1],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 0],
        [1, 0],
      ],
    ] as BoardValue,
  ],
])('returns board from value of', (value) => {
  expect(Board.from(value)).toMatchSnapshot();
});

test.each([
  Board.create([
    ['B', 'R', 'B', 'R'],
    ['R', 'B', 'R', 'B'],
    ['R', 'B', 'B', 'R'],
    ['B', 'R', 'R', 'B'],
  ]),
  Board.create([
    ['B', 'R', 'B'],
    ['R', 'B', 'R'],
    ['R', 'B', 'B'],
  ]),
])('returns board iterator', (board) => {
  expect(Array.from(board)).toMatchSnapshot();
});

test.each([
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    -1,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    0,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    1,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    2,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    3,
  ],
])('returns board line at index', (board, index) => {
  expect(board.at(index)).toMatchSnapshot();
});

test.each([
  Board.create([
    ['B', 'R', 'B', 'R'],
    ['R', 'B', 'R', 'B'],
    ['R', 'B', 'B', 'R'],
    ['B', 'R', 'R', 'B'],
  ]),
  Board.create([
    ['B', 'R', 'B'],
    ['R', 'B', 'R'],
    ['R', 'B', 'B'],
  ]),
])('returns board entries', (board) => {
  expect(Array.from(board.entries())).toMatchSnapshot();
});

test.each([
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    -1,
    vi.fn(() => BoardLine.blank(3)),
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    0,
    vi.fn(() => BoardLine.blank(3)),
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    1,
    vi.fn(() => BoardLine.blank(3)),
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    2,
    vi.fn(() => BoardLine.blank(3)),
  ],
])('replaces board line at index in board', (board, index, callback) => {
  expect(board.replace(index, callback)).toMatchSnapshot();
  expect(callback).toBeCalledWith(board.at(index));
});

test.each([
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    new MatrixSelection([{ x: -1, y: -1 }]),
    vi.fn((cell: BoardCell) => cell.next()),
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    new MatrixSelection([{ x: 0, y: 0 }]),
    vi.fn((cell: BoardCell) => cell.next()),
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    new MatrixSelection([{ x: 1, y: 1 }]),
    vi.fn((cell: BoardCell) => cell.next()),
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: -1, y: -1 },
      { x: -1, y: -1 },
    ]),
    vi.fn((cell: BoardCell) => cell.next()),
  ],
])('replaces board cell at selection in board', (board, selection, callback) => {
  expect(board.replaceBy(selection, callback)).toMatchSnapshot();
});

test.each([
  Board.create([
    ['B', 'R', 'B', 'R'],
    ['R', 'B', 'R', 'B'],
    ['R', 'B', 'B', 'R'],
    ['B', 'R', 'R', 'B'],
  ]),
  Board.create([
    ['B', 'R', 'B'],
    ['R', 'B', 'R'],
    ['R', 'B', 'B'],
  ]),
])('reverses board', (board) => {
  expect(board.reverse()).toMatchSnapshot();
  expect(board.reverse().orientation).toMatchSnapshot();
});

test.each([
  Board.create([
    ['B', 'R', 'B', 'R'],
    ['R', 'B', 'R', 'B'],
    ['R', 'B', 'B', 'R'],
    ['B', 'R', 'R', 'B'],
  ]),
  Board.create([
    ['B', 'R', 'B'],
    ['R', 'B', 'R'],
    ['R', 'B', 'B'],
  ]),
  Board.create([]),
])('rotates board', (board) => {
  expect(board.rotate()).toMatchSnapshot();
  expect(board.rotate().orientation).toMatchSnapshot();
});

test.each([
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    -1,
    undefined,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    0,
    undefined,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    1,
    undefined,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    2,
    undefined,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    3,
    undefined,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    0,
    -1,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    0,
    0,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    0,
    1,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    0,
    2,
  ],
  [
    Board.create([
      ['B', 'R', 'B'],
      ['R', 'B', 'R'],
      ['R', 'B', 'B'],
    ]),
    0,
    3,
  ],
])('slices board', (board, start, end) => {
  expect(board.slice(start, end)).toMatchSnapshot();
});

test.each([
  Board.create([
    ['B', 'R', 'B', 'R'],
    ['R', 'B', 'R', 'B'],
    ['R', 'B', 'B', 'R'],
    ['B', 'R', 'R', 'B'],
  ]),
  Board.create([
    ['B', 'R', 'B'],
    ['R', 'B', 'R'],
    ['R', 'B', 'B'],
  ]),
])('returns board value of', (board) => {
  expect(board.valueOf()).toMatchSnapshot();
});

test.each([
  Board.create([
    ['B', 'R', 'B', 'R'],
    ['R', 'B', 'R', 'B'],
    ['R', 'B', 'B', 'R'],
    ['B', 'R', 'R', 'B'],
  ]),
  Board.create([
    ['B', 'R', 'B'],
    ['R', 'B', 'R'],
    ['R', 'B', 'B'],
  ]),
])('returns board length', (board) => {
  expect(board.length).toMatchSnapshot();
});

test.each([new Board('portrait', []), new Board('landscape', [])])('returns board orientation', (board) => {
  expect(board.orientation).toMatchSnapshot();
});

test.each([
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['B', 'E', 'E', 'E'],
    ['E', 'E', 'R', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'R', 'E'],
  ]),
  Board.create([
    ['B', 'R', 'B', 'R'],
    ['R', 'B', 'R', 'B'],
    ['R', 'B', 'B', 'R'],
    ['B', 'R', 'R', 'B'],
  ]),
])('returns board progress', (board) => {
  expect(board.progress).toMatchSnapshot();
});
