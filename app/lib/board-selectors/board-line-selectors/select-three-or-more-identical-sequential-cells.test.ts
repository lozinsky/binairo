import { expect, test } from 'vitest';

import { BoardLine } from '~/lib/board';

import { selectThreeOrMoreIdenticalSequentialCells } from './select-three-or-more-identical-sequential-cells';

test.each([
  BoardLine.create(['R', 'R', 'R', 'E']),
  BoardLine.create(['E', 'R', 'R', 'R']),
  BoardLine.create(['R', 'R', 'E', 'E']),
  BoardLine.create(['E', 'E', 'R', 'R']),
])('selects three or more identical sequential cells', (target) => {
  expect(selectThreeOrMoreIdenticalSequentialCells(target)).toMatchSnapshot();
});
