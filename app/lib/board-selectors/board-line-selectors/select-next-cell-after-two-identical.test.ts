import { expect, test } from 'vitest';

import { BoardLine } from '~/lib/board';

import { selectNextCellAfterTwoIdentical } from './select-next-cell-after-two-identical';

test.each([
  BoardLine.create(['R', 'R', 'E', 'E']),
  BoardLine.create(['E', 'E', 'R', 'R']),
  BoardLine.create(['R', 'E', 'E', 'E']),
  BoardLine.create(['E', 'E', 'E', 'R']),
])('selects next cell after two identical', (target) => {
  expect(selectNextCellAfterTwoIdentical(target)).toMatchSnapshot();
});
