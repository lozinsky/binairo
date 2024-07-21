import { expect, test } from 'vitest';

import { Random } from '~/shared/random';

import { generateBoard } from './generate-board';

test.each([
  [4, 0.6],
  [6, 0.6],
  [8, 0.6],
  [10, 0.6],
  [12, 0.6],
])('generates board', (size, progress) => {
  expect(generateBoard(size, progress, Random.stable())).toMatchSnapshot();
});
