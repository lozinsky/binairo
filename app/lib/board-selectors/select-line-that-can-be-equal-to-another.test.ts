import { assert, expect, test } from 'vitest';

import { Board } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectLineThatCanBeEqualToAnother } from './select-line-that-can-be-equal-to-another';

test.each([
  Board.create([
    ['R', 'E', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['B', 'E', 'B', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'R'],
    ['E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'B', 'E', 'B'],
  ]),
])('selects line that can be equal to another', (target) => {
  const payload = selectLineThatCanBeEqualToAnother(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.collect(target, [...Array.from(payload.line), ...Array.from(payload.another)]);

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    ['R', 'E', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E'],
    ['E', 'E', 'R', 'E'],
    ['E', 'E', 'E', 'E'],
    ['B', 'E', 'B', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'R'],
    ['E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'E'],
    ['E', 'B', 'E', 'B'],
  ]),
])('returns "undefined" if no line that can be equal to another exist', (target) => {
  expect(selectLineThatCanBeEqualToAnother(target)).toMatchSnapshot();
});
