import { BoardCell, BoardCellKind, BoardCellState, BoardLine } from '~/lib/board';
import { selectThreeOrMoreIdenticalSequentialCells } from '~/lib/board-selectors/board-line-selectors';

function isValidBoardLine(target: BoardLine) {
  if (target.balance !== 0) {
    return false;
  }

  if (selectThreeOrMoreIdenticalSequentialCells(target) !== undefined) {
    return false;
  }

  return true;
}

export function generateBoardLines(size: number) {
  const lines: BoardLine[] = [];
  const n = 2 ** size;

  for (let index = 0; index < n; index++) {
    const line = new BoardLine(
      index
        .toString(2)
        .padStart(size, '0')
        .split('')
        .map((value) => new BoardCell(BoardCellKind.Fixed, value === '0' ? BoardCellState.R : BoardCellState.B)),
    );

    if (!isValidBoardLine(line)) {
      continue;
    }

    lines.push(line);
  }

  return lines;
}
