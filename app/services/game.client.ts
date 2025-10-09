import type { Session } from 'react-router';

import type { SessionData } from '~/services/session';

import { deserializeBoard, serializeBoard } from '~/lib/board-serializer';
import { type Game, isBoardSolved } from '~/services/game';

export function getGame(session: Session<SessionData>) {
  const data = session.get('game');

  if (typeof data === 'object' && data !== null) {
    if ('board' in data && typeof data.board === 'string') {
      try {
        const game: Game = {
          board: deserializeBoard(data.board),
        };

        return game;
      } catch {
        return null;
      }
    }
  }

  return null;
}

export function setGame(session: Session<SessionData>, game: Game) {
  if (isBoardSolved(game.board)) {
    session.unset('game');
  } else {
    session.set('game', { board: serializeBoard(game.board) });
  }
}
