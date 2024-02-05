import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { type ClientLoaderFunctionArgs, useLoaderData, useLocation, useParams } from '@remix-run/react';

import { Game } from '~/components/ui/game';
import { GameActions } from '~/components/ui/game-actions';
import { GameBoard } from '~/components/ui/game-board';
import { GameModal } from '~/components/ui/game-modal';
import { GameTip } from '~/components/ui/game-tip';
import { analyzeBoard, isBoardSolved, parseBoard } from '~/services/game';
import { setGame } from '~/services/game.server';
import { commitSession, getSession } from '~/services/session.server';
import { expectToBeDefined } from '~/shared/expect';
import { getErrorResponse } from '~/shared/http';
import { Random } from '~/shared/random';

import { GameActionsContent, GameBoardContent, GamePraiseModalContent, GameTipContent } from './components';

export async function loader({ context, params, request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(context, request);
    const random = Random.create();

    setGame(session, { board: parseBoard(expectToBeDefined(params.board)) });

    return json(
      { seed: random.seed },
      {
        headers: {
          'Set-Cookie': await commitSession(context, session),
        },
      },
    );
  } catch (error) {
    throw getErrorResponse(error);
  }
}

export function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const random = Random.create();

  void serverLoader();

  return { seed: random.seed };
}

export default function Route() {
  const { seed } = useLoaderData<typeof loader>();
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const board = parseBoard(expectToBeDefined(params.board));
  const boardSize = board.length;
  const boardSolved = isBoardSolved(board);
  const boardAnalyzerReview = searchParams.has('analyze') ? analyzeBoard(board, new Random(seed)) : undefined;
  const boardAnalyzerReviewPayloadData = boardAnalyzerReview?.payload.data ?? [];

  return (
    <Game>
      <GameTip>
        <GameTipContent boardAnalyzerReview={boardAnalyzerReview} progress={board.progress} />
      </GameTip>
      <GameBoard size={boardSize}>
        <GameBoardContent
          board={board}
          boardAnalyzerReviewPayloadData={boardAnalyzerReviewPayloadData}
          uncloak={searchParams.has('uncloak')}
        />
      </GameBoard>
      <GameActions>
        <GameActionsContent />
      </GameActions>
      {boardSolved && (
        <GameModal>
          <GamePraiseModalContent seed={seed} size={boardSize} />
        </GameModal>
      )}
    </Game>
  );
}
