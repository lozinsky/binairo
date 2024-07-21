import { type ClientLoaderFunctionArgs, useLocation, useParams } from '@remix-run/react';

import { GamePraiseModal } from '~/components/game-praise-modal';
import { Game } from '~/components/ui/game';
import { GameActions } from '~/components/ui/game-actions';
import { GameBoard } from '~/components/ui/game-board';
import { GameTip } from '~/components/ui/game-tip';
import { useRandom } from '~/hooks/use-random';
import { analyzeBoard, isBoardSolved, parseBoard } from '~/services/game';
import { setGame } from '~/services/game.client';
import { commitSession, getSession } from '~/services/session.client';
import { expectToBeDefined } from '~/shared/expect';

import { GameActionsContent, GameBoardContent, GameTipContent } from './components';

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const session = await getSession(document.cookie);

  setGame(session, { board: parseBoard(expectToBeDefined(params.board)) });

  document.cookie = await commitSession(session);

  return null;
}

export default function Route() {
  const params = useParams();
  const location = useLocation();
  const random = useRandom();
  const searchParams = new URLSearchParams(location.search);
  const board = parseBoard(expectToBeDefined(params.board));
  const boardSize = board.length;
  const boardSolved = isBoardSolved(board);
  const boardAnalyzerReview = searchParams.has('analyze') ? analyzeBoard(board, random) : undefined;
  const boardAnalyzerReviewPayloadPositions = boardAnalyzerReview?.payload.positions ?? [];

  return (
    <Game>
      <GameTip>
        <GameTipContent boardAnalyzerReview={boardAnalyzerReview} progress={board.progress} />
      </GameTip>
      <GameBoard size={boardSize}>
        <GameBoardContent board={board} boardAnalyzerReviewPayloadPositions={boardAnalyzerReviewPayloadPositions} />
      </GameBoard>
      <GameActions>
        <GameActionsContent />
      </GameActions>
      {boardSolved && <GamePraiseModal size={boardSize} />}
    </Game>
  );
}
