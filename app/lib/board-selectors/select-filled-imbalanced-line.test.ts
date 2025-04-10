import { assert, expect, test } from 'vitest';

import { Board } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectFilledImbalancedLine } from './select-filled-imbalanced-line';

test.each([
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'R', 'B'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'R', 'R'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'B', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
])('selects filled imbalanced line', (target) => {
  const payload = selectFilledImbalancedLine(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.collect(target, Array.from(payload.line));

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'B', 'E', 'E'],
    ['E', 'B', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
])('returns "undefined" if no filled imbalanced line exist', (target) => {
  expect(selectFilledImbalancedLine(target)).toMatchSnapshot();
});
