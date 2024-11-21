/* eslint-disable react/prop-types */

import type { ComponentType } from 'react';

import { FormattedMessage } from 'react-intl';

import { BoardOrientation } from '~/lib/board';
import { type BoardAnalyzerReviewPayload, BoardAnalyzerReviewReason } from '~/lib/board-analyzer';

const MESSAGE_BY_BOARD_ANALYZER_REVIEW_REASON: Readonly<
  Record<BoardAnalyzerReviewReason, ComponentType<{ orientation: BoardOrientation }>>
> = {
  [BoardAnalyzerReviewReason.LineCanBeEqualToAnother]({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineCanBeEqualToAnotherReason'
        values={{ lines: orientation === BoardOrientation.Portrait ? 'rows' : 'columns' }}
      />
    );
  },

  [BoardAnalyzerReviewReason.LineIncludesAnother]({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineIncludesAnotherReason'
        values={{ lines: orientation === BoardOrientation.Portrait ? 'rows' : 'columns' }}
      />
    );
  },

  [BoardAnalyzerReviewReason.LineIsEqualToOthers]({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineIsEqualToOthersReason'
        values={{ lines: orientation === BoardOrientation.Portrait ? 'rows' : 'columns' }}
      />
    );
  },

  [BoardAnalyzerReviewReason.LineIsFilledAndImbalanced]({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineIsFilledAndImbalancedReason'
        values={{ line: orientation === BoardOrientation.Portrait ? 'row' : 'column' }}
      />
    );
  },

  [BoardAnalyzerReviewReason.LineIsUnfilledAndBalanced]({ orientation }) {
    return (
      <FormattedMessage
        id='gameBoardAnalyzerReviewLineIsUnfilledAndBalancedReason'
        values={{ line: orientation === BoardOrientation.Portrait ? 'row' : 'column' }}
      />
    );
  },

  [BoardAnalyzerReviewReason.MiddleCellBetweenTwoIdentical]() {
    return <FormattedMessage id='gameBoardAnalyzerReviewMiddleCellBetweenTwoIdenticalReason' />;
  },

  [BoardAnalyzerReviewReason.NextCellAfterTwoIdentical]() {
    return <FormattedMessage id='gameBoardAnalyzerReviewNextCellAfterTwoIdenticalReason' />;
  },

  [BoardAnalyzerReviewReason.ThreeOrMoreIdenticalSequentialCells]() {
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
