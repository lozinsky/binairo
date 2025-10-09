import type { ReactNode } from 'react';

import { HelpCircle } from 'lucide-react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { href } from 'react-router';

import type { Board } from '~/lib/board';
import type { BoardAnalyzerReview } from '~/lib/board-analyzer';
import type { MatrixSelectionPosition } from '~/lib/matrix';

import { AriaLabel } from '~/components/base/aria-label';
import { AriaLabelled } from '~/components/base/aria-labelled';
import { GameBoardCellLink } from '~/components/game-board-cell-link';
import { ButtonLink } from '~/components/ui/button-link';
import { GameBoardAnalyzerReview } from '~/components/ui/game-board-analyzer-review';
import { serializeBoard } from '~/lib/board-serializer';
import { getNextBoard } from '~/services/game';

export function GameActionsContent() {
  return (
    <AriaLabelled>
      <ButtonLink replace size='icon' to='.?analyze' variant='ghost'>
        <HelpCircle aria-hidden />
        <AriaLabel>
          <FormattedMessage id='gameAnalyzeActionLabel' />
        </AriaLabel>
      </ButtonLink>
    </AriaLabelled>
  );
}

export function GameBoardContent({
  board,
  boardAnalyzerReviewPayloadPositions,
}: {
  board: Board;
  boardAnalyzerReviewPayloadPositions: readonly MatrixSelectionPosition[];
}) {
  const children: ReactNode[] = [];

  for (const [y, line] of board.entries()) {
    for (const [x, cell] of line.entries()) {
      const key = `${x}-${y}`;
      const highlighted = boardAnalyzerReviewPayloadPositions.some((position) => position.x === x && position.y === y);
      const locked = cell.isFixed;

      children.push(
        <GameBoardCellLink
          highlighted={highlighted}
          key={key}
          locked={locked}
          state={cell.state}
          to={href('/game/:board', { board: serializeBoard(getNextBoard(board, { x, y })) })}
        />,
      );
    }
  }

  return children;
}

export function GameTipContent({
  boardAnalyzerReview,
  progress,
}: {
  boardAnalyzerReview?: BoardAnalyzerReview;
  progress: number;
}) {
  if (boardAnalyzerReview === undefined) {
    return <FormattedNumber style='percent' value={progress} />;
  }

  return <GameBoardAnalyzerReview payload={boardAnalyzerReview.payload} reason={boardAnalyzerReview.reason} />;
}
