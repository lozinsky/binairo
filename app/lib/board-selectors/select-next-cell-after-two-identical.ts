import type { Board } from '~/lib/board';

import { selectNextCellAfterTwoIdentical as select } from './board-line-selectors';

export function selectNextCellAfterTwoIdentical(target: Board) {
  for (const board of target.toDoubleRotation()) {
    for (const line of board) {
      const payload = select(line);

      if (payload === undefined) {
        continue;
      }

      return { cell: payload.cell, orientation: board.orientation };
    }
  }

  return;
}
