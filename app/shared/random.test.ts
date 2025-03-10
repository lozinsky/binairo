import { expect, test } from 'vitest';

import { Random, sample, shuffle } from './random';

test('returns random with stable state', () => {
  expect(Random.stable().state).toMatchInlineSnapshot(`
    [
      -1,
      -1,
      0,
      0,
    ]
  `);
});

test.each([
  [0, 100],
  [-100, 0],
  [-100, 100],
])('returns random number', (from, to) => {
  expect(Random.stable().next(from, to)).toMatchSnapshot();
});

test.each([[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]]])(
  'returns shuffled array',
  (target) => {
    expect(shuffle(target, Random.stable())).toMatchSnapshot();
  },
);

test.each([[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]]])(
  'returns random array item',
  (target) => {
    expect(sample(target, Random.stable())).toMatchSnapshot();
  },
);
