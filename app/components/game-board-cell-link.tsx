import { type Path, useLocation } from '@remix-run/react';
import { FormattedMessage } from 'react-intl';

import type { Messages } from '~/services/intl';

import { AriaLabel } from '~/components/base/aria-label';
import { AriaLabelled } from '~/components/base/aria-labelled';
import { HistoryLink } from '~/components/base/history-link';
import { GameBoardCell } from '~/components/ui/game-board-cell';
import { GameBoardCellLock } from '~/components/ui/game-board-cell-lock';
import { BoardCellState } from '~/lib/board';

const GAME_BOARD_CELL_MESSAGE_ID_BY_BOARD_CELL_STATE: Readonly<Record<BoardCellState, keyof Messages>> = {
  [BoardCellState.B]: 'gameBoardBCellLabel',
  [BoardCellState.E]: 'gameBoardECellLabel',
  [BoardCellState.R]: 'gameBoardRCellLabel',
};

export function GameBoardCellLink({
  highlighted,
  locked,
  state,
  to,
}: {
  highlighted?: boolean;
  locked?: boolean;
  state: BoardCellState;
  to: Partial<Path> | string;
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <AriaLabelled>
      <GameBoardCell asChild highlighted={highlighted} locked={locked} state={state}>
        {locked ? (
          <HistoryLink preventScrollReset replace tabIndex={-1} to='.?uncloak'>
            {searchParams.has('uncloak') && <GameBoardCellLock />}
            <AriaLabel>
              <FormattedMessage id={GAME_BOARD_CELL_MESSAGE_ID_BY_BOARD_CELL_STATE[state]} />
              <FormattedMessage id='gameBoardLockedCellLabel' />
              {highlighted && <FormattedMessage id='gameBoardHighlightedCellLabel' />}
            </AriaLabel>
          </HistoryLink>
        ) : (
          <HistoryLink preventScrollReset replace to={to}>
            <AriaLabel>
              <FormattedMessage id={GAME_BOARD_CELL_MESSAGE_ID_BY_BOARD_CELL_STATE[state]} />
              {highlighted && <FormattedMessage id='gameBoardHighlightedCellLabel' />}
            </AriaLabel>
          </HistoryLink>
        )}
      </GameBoardCell>
    </AriaLabelled>
  );
}
