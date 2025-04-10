import { assert, expect, test } from 'vitest';

import { Board } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectLineThatIsEqualToOthers } from './select-line-that-is-equal-to-others';

test.each([
  Board.create([
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E'],
    ['R', 'E', 'R', 'E'],
    ['B', 'E', 'B', 'E'],
    ['B', 'E', 'B', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'R'],
    ['E', 'R', 'E', 'R'],
    ['E', 'B', 'E', 'B'],
    ['E', 'B', 'E', 'B'],
  ]),
])('selects line that is equal to others', (target) => {
  const payload = selectLineThatIsEqualToOthers(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.collect(target, [
    ...Array.from(payload.line),
    ...payload.others.flatMap((line) => Array.from(line)),
  ]);

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    ['R', 'R', 'B', 'B'],
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'E'],
    ['E', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'E'],
    ['E', 'E', 'E', 'E'],
    ['R', 'R', 'B', 'B'],
  ]),
  Board.create([
    ['R', 'E', 'R', 'E'],
    ['R', 'E', 'R', 'E'],
    ['B', 'E', 'B', 'E'],
    ['B', 'E', 'E', 'E'],
  ]),
  Board.create([
    ['E', 'R', 'E', 'R'],
    ['E', 'R', 'E', 'R'],
    ['E', 'B', 'E', 'B'],
    ['E', 'E', 'E', 'B'],
  ]),
])('returns "undefined" if no line that is equal to others exist', (target) => {
  expect(selectLineThatIsEqualToOthers(target)).toMatchSnapshot();
});
