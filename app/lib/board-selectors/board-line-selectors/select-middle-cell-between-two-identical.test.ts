import { expect, test } from 'vitest';

import { BoardLine } from '~/lib/board';

import { selectMiddleCellBetweenTwoIdentical } from './select-middle-cell-between-two-identical';

test.each([
  BoardLine.create(['R', 'E', 'R', 'E']),
  BoardLine.create(['E', 'R', 'E', 'R']),
  BoardLine.create(['R', 'E', 'E', 'E']),
  BoardLine.create(['E', 'E', 'E', 'R']),
])('selects middle cell between two identical', (target) => {
  expect(selectMiddleCellBetweenTwoIdentical(target)).toMatchSnapshot();
});
