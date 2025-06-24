import type { Board } from '~/lib/board';

import { selectMiddleCellBetweenTwoIdentical as select } from './board-line-selectors';

export function selectMiddleCellBetweenTwoIdentical(target: Board) {
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
