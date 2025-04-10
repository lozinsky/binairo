import type { ComponentType } from 'react';

import { FormattedMessage } from 'react-intl';

import type { BoardOrientation } from '~/lib/board';
import type { BoardAnalyzerReviewReason } from '~/lib/board-analyzer';
import type { BoardAnalyzerReviewPayload } from '~/lib/board-analyzer';

const MESSAGE_BY_BOARD_ANALYZER_REVIEW_REASON: Readonly<
  Record<BoardAnalyzerReviewReason, ComponentType<{ orientation: BoardOrientation }>>
> = {
  'line-can-be-equal-to-another'({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineCanBeEqualToAnotherReason'
        values={{ lines: orientation === 'portrait' ? 'rows' : 'columns' }}
      />
    );
  },

  'line-includes-another'({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineIncludesAnotherReason'
        values={{ lines: orientation === 'portrait' ? 'rows' : 'columns' }}
      />
    );
  },

  'line-is-equal-to-others'({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineIsEqualToOthersReason'
        values={{ lines: orientation === 'portrait' ? 'rows' : 'columns' }}
      />
    );
  },

  'line-is-filled-and-imbalanced'({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineIsFilledAndImbalancedReason'
        values={{ line: orientation === 'portrait' ? 'row' : 'column' }}
      />
    );
  },

  'line-is-unfilled-and-balanced'({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineIsUnfilledAndBalancedReason'
        values={{ line: orientation === 'portrait' ? 'row' : 'column' }}
      />
    );
  },

  'middle-cell-between-two-identical'() {
    return <FormattedMessage id='gameBoardAnalyzerReviewMiddleCellBetweenTwoIdenticalReason' />;
  },

  'next-cell-after-two-identical'() {
    return <FormattedMessage id='gameBoardAnalyzerReviewNextCellAfterTwoIdenticalReason' />;
  },

  'three-or-more-identical-sequential-cells'() {
    return <FormattedMessage id='gameBoardAnalyzerReviewThreeOrMoreIdenticalSequentialCellsReason' />;
  },
};

export function GameBoardAnalyzerReview({
  payload,
  reason,
}: {
  payload: BoardAnalyzerReviewPayload;
  reason: BoardAnalyzerReviewReason;
}) {
  const Message = MESSAGE_BY_BOARD_ANALYZER_REVIEW_REASON[reason];

  return <Message orientation={payload.orientation} />;
}
