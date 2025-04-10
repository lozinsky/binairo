import { assert, expect, test } from 'vitest';

import { Board } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectNextCellAfterTwoIdentical } from './select-next-cell-after-two-identical';

test.each([
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'R', 'R'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
])('selects next cell after two identical', (target) => {
  const payload = selectNextCellAfterTwoIdentical(target);

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
])('returns "undefined" if no next cell after two identical exist', (target) => {
  expect(selectNextCellAfterTwoIdentical(target)).toMatchSnapshot();
});
