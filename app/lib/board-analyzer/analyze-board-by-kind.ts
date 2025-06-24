import type { Board, BoardOrientation } from '~/lib/board';

import {
  selectFilledImbalancedLine,
  selectLineThatCanBeEqualToAnother,
  selectLineThatIncludesAnother,
  selectLineThatIsEqualToOthers,
  selectMiddleCellBetweenTwoIdentical,
  selectNextCellAfterTwoIdentical,
  selectThreeOrMoreIdenticalSequentialCells,
  selectUnfilledBalancedLine,
} from '~/lib/board-selectors';
import { MatrixSelection, type MatrixSelectionPosition } from '~/lib/matrix';
import { type Random, shuffle } from '~/shared/random';

export interface BoardAnalyzerReview {
  readonly payload: BoardAnalyzerReviewPayload;
  readonly reason: BoardAnalyzerReviewReason;
}

export type BoardAnalyzerReviewKind = 'correction' | 'suggestion';

export interface BoardAnalyzerReviewPayload {
  readonly orientation: BoardOrientation;
  readonly positions: readonly MatrixSelectionPosition[];
}

export type BoardAnalyzerReviewReason =
  | 'line-can-be-equal-to-another'
  | 'line-includes-another'
  | 'line-is-equal-to-others'
  | 'line-is-filled-and-imbalanced'
  | 'line-is-unfilled-and-balanced'
  | 'middle-cell-between-two-identical'
  | 'next-cell-after-two-identical'
  | 'three-or-more-identical-sequential-cells';

const BOARD_ANALYZER_REVIEW_REASONS_BY_BOARD_ANALYZER_REVIEW_KIND: Readonly<
  Record<BoardAnalyzerReviewKind, readonly BoardAnalyzerReviewReason[]>
> = {
  correction: ['line-is-filled-and-imbalanced', 'line-is-equal-to-others', 'three-or-more-identical-sequential-cells'],
  suggestion: [
    'line-is-unfilled-and-balanced',
    'line-can-be-equal-to-another',
    'line-includes-another',
    'middle-cell-between-two-identical',
    'next-cell-after-two-identical',
  ],
};

const SELECT_BY_BOARD_ANALYZER_REVIEW_REASON: Readonly<
  Record<BoardAnalyzerReviewReason, (target: Board) => BoardAnalyzerReviewPayload | undefined>
> = {
  'line-can-be-equal-to-another'(target) {
    const payload = selectLineThatCanBeEqualToAnother(target);

    if (payload === undefined) {
      return;
    }

    const cells = [...Array.from(payload.line), ...Array.from(payload.another)];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  'line-includes-another'(target) {
    const payload = selectLineThatIncludesAnother(target);

    if (payload === undefined) {
      return;
    }

    const cells = [...Array.from(payload.line), ...Array.from(payload.another)];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  'line-is-equal-to-others'(target) {
    const payload = selectLineThatIsEqualToOthers(target);

    if (payload === undefined) {
      return;
    }

    const cells = [...Array.from(payload.line), ...payload.others.flatMap((line) => Array.from(line))];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  'line-is-filled-and-imbalanced'(target) {
    const payload = selectFilledImbalancedLine(target);

    if (payload === undefined) {
      return;
    }

    const cells = Array.from(payload.line);

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  'line-is-unfilled-and-balanced'(target) {
    const payload = selectUnfilledBalancedLine(target);

    if (payload === undefined) {
      return;
    }

    const cells = Array.from(payload.line);

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  'middle-cell-between-two-identical'(target) {
    const payload = selectMiddleCellBetweenTwoIdentical(target);

    if (payload === undefined) {
      return;
    }

    const cells = [payload.cell];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  'next-cell-after-two-identical'(target) {
    const payload = selectNextCellAfterTwoIdentical(target);

    if (payload === undefined) {
      return;
    }

    const cells = [payload.cell];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  'three-or-more-identical-sequential-cells'(target) {
    const payload = selectThreeOrMoreIdenticalSequentialCells(target);

    if (payload === undefined) {
      return;
    }

    const cells = payload.cells;

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },
};

export function analyzeBoardByKind(
  kind: BoardAnalyzerReviewKind,
  target: Board,
  random: Random,
): BoardAnalyzerReview | undefined {
  const reasons = shuffle(BOARD_ANALYZER_REVIEW_REASONS_BY_BOARD_ANALYZER_REVIEW_KIND[kind], random);

  for (const reason of reasons) {
    const select = SELECT_BY_BOARD_ANALYZER_REVIEW_REASON[reason];
    const payload = select(target);

    if (payload === undefined) {
      continue;
    }

    return { payload, reason };
  }

  return;
}
