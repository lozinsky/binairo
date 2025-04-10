import { assert, expect, test } from 'vitest';

import { Board } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectUnfilledBalancedLine } from './select-unfilled-balanced-line';

test.each([
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'E', 'E'],
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
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'R'],
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
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'B', 'R'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'B', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'B', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
])('selects unfilled balanced line', (target) => {
  const payload = selectUnfilledBalancedLine(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.collect(target, Array.from(payload.line));

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'R', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'E', 'R'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'R', 'R'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['B', 'R', 'B', 'R'],
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
    ['E', 'B', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'B', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
])('returns "undefined" if no unfilled balanced line exist', (target) => {
  expect(selectUnfilledBalancedLine(target)).toMatchSnapshot();
});
