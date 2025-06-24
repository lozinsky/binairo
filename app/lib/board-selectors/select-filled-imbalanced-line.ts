import type { Board } from '~/lib/board';

export function selectFilledImbalancedLine(target: Board) {
  for (const board of target.toDoubleRotation()) {
    for (const line of board) {
      if (line.isFilled && line.balance !== 0) {
        return { line, orientation: board.orientation };
      }
    }
  }

  return;
}
