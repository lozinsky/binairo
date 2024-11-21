import { Board, type BoardValue } from '~/lib/board';
import * as BoardAnalyzer from '~/lib/board-analyzer';
import { MatrixSelection, type MatrixSelectionPosition } from '~/lib/matrix';
import { Random } from '~/shared/random';

export interface Game {
  readonly board: Board;
}

export function analyzeBoard(board: Board, random: Random) {
  return BoardAnalyzer.analyzeBoard(board, random);
}

export function getBoard(value: BoardValue) {
  return Board.from(value);
}

export function getNextBoard(board: Board, position: MatrixSelectionPosition) {
  return board.replaceBy(new MatrixSelection([position]), (cell) => cell.next());
}

export function isBoardSolved(board: Board) {
  if (board.progress < 1) {
    return false;
  }

  const boardAnalyzerReview = BoardAnalyzer.analyzeBoardByKind(
    BoardAnalyzer.BoardAnalyzerReviewKind.Correction,
    board,
    Random.stable(),
  );

  return boardAnalyzerReview === undefined;
}

export function parseBoard(value: string) {
  return Board.parse(value);
}
