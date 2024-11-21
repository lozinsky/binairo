import { Board, BoardCell, BoardCellState } from '~/lib/board';
import {
  selectFilledImbalancedLine,
  selectLineThatIsEqualToOthers,
  selectThreeOrMoreIdenticalSequentialCells,
} from '~/lib/board-selectors';
import { MatrixSelection } from '~/lib/matrix';
import { expectToBeDefined } from '~/shared/expect';
import { type Random, shuffle } from '~/shared/random';

import { generateBoardLines } from './generate-board-lines';

export function generateBoard(size: number, progress: number, random: Random) {
  const lines = generateBoardLines(size);
  const combinations = shuffle(lines, random);

  let attempt = 0;
  let board = Board.blank(size);
  let index = 0;

  do {
    const line = expectToBeDefined(combinations.shift());
    const target = board.replace(index, () => line);

    attempt++;

    if (isValidBoard(target)) {
      board = target;
      index++;
      attempt = 0;
    } else {
      combinations.push(line);

      if (attempt >= combinations.length) {
        for (const line of board) {
          if (lines.includes(line)) {
            combinations.push(line);
          }
        }

        board = Board.blank(size);
        index = 0;
        attempt = 0;
      }
    }
  } while (index < size);

  do {
    const x = random.next(0, size - 1);
    const y = random.next(0, size - 1);

    if (expectToBeDefined(expectToBeDefined(board.at(y)).at(x)).isEmpty) {
      continue;
    }

    board = board.replaceBy(new MatrixSelection([{ x, y }]), () => BoardCell.create(BoardCellState.E));
  } while (board.progress > progress);

  return board;
}

function isValidBoard(target: Board) {
  if (selectFilledImbalancedLine(target) !== undefined) {
    return false;
  }

  if (selectLineThatIsEqualToOthers(target) !== undefined) {
    return false;
  }

  if (selectThreeOrMoreIdenticalSequentialCells(target) !== undefined) {
    return false;
  }

  return true;
}
