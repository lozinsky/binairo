import { assert, expect, test } from 'vitest';

import { Board } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectMiddleCellBetweenTwoIdentical } from './select-middle-cell-between-two-identical';

test.each([
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'R', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'R'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
])('selects middle cell between two identical', (target) => {
  const payload = selectMiddleCellBetweenTwoIdentical(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.collect(target, [payload.cell]);

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'R'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
])('returns "undefined" if no middle cell between two identical exist', (target) => {
  expect(selectMiddleCellBetweenTwoIdentical(target)).toMatchSnapshot();
});
