import { bench } from 'vitest';

import { Random } from '~/shared/random';

import { generateBoard } from './generate-board';

const cases: ReadonlyArray<readonly [number, number]> = [
  [4, 0.6],
  [6, 0.6],
  [8, 0.6],
  [10, 0.6],
  [12, 0.6],
];

for (const [size, progress] of cases) {
  bench(`generates ${size} board`, () => {
    generateBoard(size, progress, Random.stable());
  });
}
