import type { Board } from '~/lib/board';

import { selectThreeOrMoreIdenticalSequentialCells as select } from './board-line-selectors';

export function selectThreeOrMoreIdenticalSequentialCells(target: Board) {
  for (const board of target.toDoubleRotation()) {
    for (const line of board) {
      const payload = select(line);

      if (payload === undefined) {
        continue;
      }

      return { cells: payload.cells, orientation: board.orientation };
    }
  }

  return;
}
