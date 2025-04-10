import { assert, expect, test } from 'vitest';

import { Board } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectThreeOrMoreIdenticalSequentialCells } from './select-three-or-more-identical-sequential-cells';

test.each([
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'R', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'R', 'R'],
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
    ['E', 'E', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
    ['E', 'R', 'E', 'E'],
  ]),
])('selects three or more identical sequential cells', (target) => {
  const payload = selectThreeOrMoreIdenticalSequentialCells(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.collect(target, payload.cells);

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

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
])('returns "undefined" if no three or more identical sequential cells exist', (target) => {
  expect(selectThreeOrMoreIdenticalSequentialCells(target)).toMatchSnapshot();
});
