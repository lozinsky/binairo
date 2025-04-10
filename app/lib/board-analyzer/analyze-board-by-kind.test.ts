import { expect, test } from 'vitest';

import { Board } from '~/lib/board';
import { Random } from '~/shared/random';

import type { BoardAnalyzerReviewKind } from './analyze-board-by-kind';

import { analyzeBoardByKind } from './analyze-board-by-kind';

test.each<[BoardAnalyzerReviewKind, Board]>([
  [
    'correction',
    Board.create([
      ['E', 'B', 'E', 'B'],
      ['E', 'E', 'B', 'E'],
      ['B', 'E', 'R', 'E'],
      ['B', 'R', 'B', 'R'],
    ]),
  ],
  [
    'correction',
    Board.create([
      ['E', 'B', 'E', 'B'],
      ['B', 'E', 'B', 'E'],
      ['B', 'E', 'R', 'E'],
      ['B', 'R', 'B', 'R'],
    ]),
  ],
  [
    'suggestion',
    Board.create([
      ['E', 'B', 'E', 'B'],
      ['E', 'E', 'B', 'E'],
      ['B', 'E', 'R', 'E'],
      ['B', 'R', 'B', 'R'],
    ]),
  ],
  [
    'correction',
    Board.create([
      ['B', 'B', 'R', 'R', 'E', 'R'],
      ['R', 'R', 'B', 'R', 'E', 'E'],
      ['E', 'E', 'E', 'B', 'R', 'E'],
      ['E', 'E', 'R', 'B', 'R', 'E'],
      ['R', 'E', 'B', 'R', 'E', 'E'],
      ['R', 'R', 'E', 'E', 'R', 'B'],
    ]),
  ],
  [
    'correction',
    Board.create([
      ['B', 'B', 'R', 'R', 'E', 'R'],
      ['R', 'R', 'B', 'R', 'E', 'E'],
      ['E', 'E', 'E', 'B', 'R', 'E'],
      ['R', 'E', 'R', 'B', 'R', 'E'],
      ['R', 'E', 'B', 'R', 'E', 'E'],
      ['R', 'R', 'E', 'E', 'R', 'B'],
    ]),
  ],
  [
    'suggestion',
    Board.create([
      ['B', 'B', 'R', 'R', 'E', 'R'],
      ['R', 'R', 'B', 'R', 'E', 'E'],
      ['E', 'E', 'E', 'B', 'R', 'E'],
      ['E', 'E', 'R', 'B', 'R', 'E'],
      ['R', 'E', 'B', 'R', 'E', 'E'],
      ['R', 'R', 'E', 'E', 'R', 'B'],
    ]),
  ],
])('analyzes board by kind', (kind, target) => {
  expect(analyzeBoardByKind(kind, target, Random.stable())).toMatchSnapshot();
});
