import { expect, test } from 'vitest';

import { MatrixSelection } from './matrix-selection';

test.each([
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [1, 1, 4, 5, 7, 9],
  ],
  [
    [
      [1, 2],
      [4, 5],
    ],
    [1, 1, 4, 5],
  ],
])('collects matrix selection from cells', (matrix, cells) => {
  expect(MatrixSelection.collect(matrix, cells).execute(matrix)).toMatchSnapshot();
});

test.each([
  [
    [
      new MatrixSelection([{ x: 0, y: 0 }]),
      new MatrixSelection([{ x: 0, y: 0 }]),
      new MatrixSelection([{ x: 0, y: 1 }]),
      new MatrixSelection([{ x: 1, y: 1 }]),
      new MatrixSelection([{ x: 0, y: 2 }]),
      new MatrixSelection([{ x: 2, y: 2 }]),
    ],
  ],
  [
    [
      new MatrixSelection([{ x: 0, y: 0 }]),
      new MatrixSelection([{ x: 0, y: 0 }]),
      new MatrixSelection([{ x: 0, y: 1 }]),
      new MatrixSelection([{ x: 1, y: 1 }]),
    ],
  ],
])('concatenates matrix selection', (selections) => {
  expect(MatrixSelection.concat(...selections)).toMatchSnapshot();
});

test.each([
  [
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ]),
    new MatrixSelection([{ x: 0, y: 0 }]),
  ],
  [
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ]),
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ]),
  ],
  [
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ]),
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ]),
  ],
])('excludes matrix selection', (selection, other) => {
  expect(selection.exclude(other)).toMatchSnapshot();
});

test.each([
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
    ]),
  ],
  [
    [
      [1, 2],
      [4, 5],
    ],
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
    ]),
  ],
])('returns matrix selection cells', (matrix, selection) => {
  expect(selection.execute(matrix)).toMatchSnapshot();
});

test.each([
  new MatrixSelection([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
  ]),
  new MatrixSelection([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]),
])('returns matrix selection value of', (selection) => {
  expect(selection.valueOf()).toMatchSnapshot();
});

test.each([
  new MatrixSelection([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
  ]),
  new MatrixSelection([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]),
])('returns matrix selection length', (selection) => {
  expect(selection.length).toMatchSnapshot();
});
