import { assert, expect, test } from 'vitest';

import { Board } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectLineThatIncludesAnother } from './select-line-that-includes-another';

test.each([
  Board.create([
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E'],
    ['R', 'E', 'E', 'E'],
    ['B', 'E', 'E', 'E'],
    ['B', 'E', 'B', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'R'],
    ['E', 'R', 'E', 'E'],
    ['E', 'B', 'E', 'E'],
    ['E', 'B', 'E', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E'],
    ['E', 'E', 'R', 'E'],
    ['E', 'E', 'B', 'E'],
    ['B', 'E', 'B', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'R'],
    ['E', 'E', 'E', 'R'],
    ['E', 'E', 'E', 'B'],
    ['E', 'B', 'E', 'B'],
  ]),
  Board.create([
    ['R', 'R', 'B', 'B', 'R', 'B'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B', 'R', 'B'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B', 'E', 'E'],
  ]),
  Board.create([
    ['R', 'R', 'B', 'B', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B', 'R', 'B'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B', 'R', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E', 'E', 'E'],
    ['R', 'E', 'R', 'E', 'E', 'E'],
    ['B', 'E', 'B', 'E', 'E', 'E'],
    ['B', 'E', 'B', 'E', 'E', 'E'],
    ['R', 'E', 'E', 'E', 'E', 'E'],
    ['B', 'E', 'E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'R', 'E', 'R'],
    ['E', 'E', 'E', 'R', 'E', 'R'],
    ['E', 'E', 'E', 'B', 'E', 'B'],
    ['E', 'E', 'E', 'B', 'E', 'B'],
    ['E', 'E', 'E', 'R', 'E', 'E'],
    ['E', 'E', 'E', 'B', 'E', 'E'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E', 'E', 'E'],
    ['R', 'E', 'R', 'E', 'E', 'E'],
    ['B', 'E', 'B', 'E', 'E', 'E'],
    ['B', 'E', 'B', 'E', 'E', 'E'],
    ['E', 'E', 'R', 'E', 'E', 'E'],
    ['E', 'E', 'B', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'R', 'E', 'R'],
    ['E', 'E', 'E', 'R', 'E', 'R'],
    ['E', 'E', 'E', 'B', 'E', 'B'],
    ['E', 'E', 'E', 'B', 'E', 'B'],
    ['E', 'E', 'E', 'E', 'E', 'R'],
    ['E', 'E', 'E', 'E', 'E', 'B'],
  ]),
])('selects line that includes another', (target) => {
  const payload = selectLineThatIncludesAnother(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.collect(target, [...Array.from(payload.line), ...Array.from(payload.another)]);

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'B', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'B', 'E', 'B'],
  ]),
  Board.create([
    ['R', 'B', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'B', 'E', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E'],
    ['R', 'E', 'B', 'E'],
    ['B', 'E', 'E', 'E'],
    ['B', 'E', 'B', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'R'],
    ['E', 'R', 'E', 'B'],
    ['E', 'B', 'E', 'E'],
    ['E', 'B', 'E', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E'],
    ['B', 'E', 'R', 'E'],
    ['E', 'E', 'B', 'E'],
    ['B', 'E', 'B', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'R'],
    ['E', 'B', 'E', 'R'],
    ['E', 'E', 'E', 'B'],
    ['E', 'B', 'E', 'B'],
  ]),
])('returns "undefined" if no line that includes another exist', (target) => {
  expect(selectLineThatIncludesAnother(target)).toMatchSnapshot();
});
