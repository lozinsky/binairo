import { type Board, BoardCellState } from '~/lib/board';

export function selectUnfilledBalancedLine(target: Board) {
  for (const board of target.toDoubleRotation()) {
    for (const line of board) {
      if (!line.isFilled) {
        const length = Math.max(line.lengthOf(BoardCellState.R), line.lengthOf(BoardCellState.B));

        if (length === line.length / 2) {
          return { line, orientation: board.orientation };
        }
      }
    }
  }
}
