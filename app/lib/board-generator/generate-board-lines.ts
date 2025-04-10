import { BoardCell, BoardLine } from '~/lib/board';
import { selectThreeOrMoreIdenticalSequentialCells } from '~/lib/board-selectors/board-line-selectors';

export function generateBoardLines(size: number) {
  const lines: BoardLine[] = [];
  const n = 2 ** size;

  for (let index = 0; index < n; index++) {
    const line = new BoardLine(
      index
        .toString(2)
        .padStart(size, '0')
        .split('')
        .map((value) => new BoardCell('fixed', value === '0' ? 'R' : 'B')),
    );

    if (!isValidBoardLine(line)) {
      continue;
    }

    lines.push(line);
  }

  return lines;
}

function isValidBoardLine(target: BoardLine) {
  if (target.balance !== 0) {
    return false;
  }

  if (selectThreeOrMoreIdenticalSequentialCells(target) !== undefined) {
    return false;
  }

  return true;
}
