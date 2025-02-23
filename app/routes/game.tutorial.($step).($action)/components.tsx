import type { ReactNode } from 'react';

import { href } from 'react-router';

import type { Board } from '~/lib/board';

import { GameBoardCellLink } from '~/components/game-board-cell-link';
import { MatrixSelection } from '~/lib/matrix';

import { useParsedParams } from './hooks';

export function GameBoardContent({
  action,
  board,
  highlight,
  index,
}: {
  action: MatrixSelection;
  board: Board;
  highlight: MatrixSelection;
  index: number;
}) {
  const params = useParsedParams();
  const children: ReactNode[] = [];
  const actions = action.execute(board);
  const highlights = highlight.execute(board);

  for (const [y, line] of board.entries()) {
    for (const [x, cell] of line.entries()) {
      const key = `${x}-${y}`;
      const locked = !actions.includes(cell);
      const highlighted = highlights.includes(cell);
      const to =
        action.length === 1
          ? href('/game/tutorial/:step?/:action?', { step: (index + 1).toString() })
          : href('/game/tutorial/:step?/:action?', {
              action: MatrixSelection.concat(params.action, new MatrixSelection([{ x, y }])).toString(),
              step: index.toString(),
            });

      children.push(
        <GameBoardCellLink highlighted={highlighted} key={key} locked={locked} state={cell.state} to={to} />,
      );
    }
  }

  return children;
}
