import { expect, test } from 'vitest';

import { Board, BoardCellState } from '~/lib/board';
import { Random } from '~/shared/random';

import { analyzeBoardByKind, BoardAnalyzerReviewKind } from './analyze-board-by-kind';

test.each([
  [
    BoardAnalyzerReviewKind.Correction,
    Board.create([
      [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
      [BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E],
      [BoardCellState.B, BoardCellState.E, BoardCellState.R, BoardCellState.E],
      [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    ]),
  ],
  [
    BoardAnalyzerReviewKind.Correction,
    Board.create([
      [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
      [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E],
      [BoardCellState.B, BoardCellState.E, BoardCellState.R, BoardCellState.E],
      [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    ]),
  ],
  [
    BoardAnalyzerReviewKind.Suggestion,
    Board.create([
      [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
      [BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E],
      [BoardCellState.B, BoardCellState.E, BoardCellState.R, BoardCellState.E],
      [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    ]),
  ],
  [
    BoardAnalyzerReviewKind.Correction,
    Board.create([
      [BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.R],
      [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.E, BoardCellState.E],
      [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.R, BoardCellState.E],
      [BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.E],
      [BoardCellState.R, BoardCellState.E, BoardCellState.B, BoardCellState.R, BoardCellState.E, BoardCellState.E],
      [BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.B],
    ]),
  ],
  [
    BoardAnalyzerReviewKind.Correction,
    Board.create([
      [BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.R],
      [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.E, BoardCellState.E],
      [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.R, BoardCellState.E],
      [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.E],
      [BoardCellState.R, BoardCellState.E, BoardCellState.B, BoardCellState.R, BoardCellState.E, BoardCellState.E],
      [BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.B],
    ]),
  ],
  [
    BoardAnalyzerReviewKind.Suggestion,
    Board.create([
      [BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.R],
      [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.E, BoardCellState.E],
      [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.R, BoardCellState.E],
      [BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.E],
      [BoardCellState.R, BoardCellState.E, BoardCellState.B, BoardCellState.R, BoardCellState.E, BoardCellState.E],
      [BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.B],
    ]),
  ],
])('analyzes board by kind', (kind, target) => {
  expect(analyzeBoardByKind(kind, target, Random.stable())).toMatchSnapshot();
});
