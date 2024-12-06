import { expect } from 'vitest';

import '~/globals';
import { Board, BoardCell, BoardCellState, BoardLine } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

const BOARD_CELL_CONTENT_BY_BOARD_CELL_STATE: Readonly<Record<BoardCellState, string>> = {
  [BoardCellState.B]: '\uD83D\uDFE6',
  [BoardCellState.E]: '\u2B1C',
  [BoardCellState.R]: '\uD83D\uDFE5',
};

expect.addSnapshotSerializer({
  serialize(value: BoardCell) {
    const content = BOARD_CELL_CONTENT_BY_BOARD_CELL_STATE[value.state];

    return value.isFixed ? `{${content}}` : `[${content}]`;
  },

  test(value: unknown) {
    return value instanceof BoardCell;
  },
});

expect.addSnapshotSerializer({
  serialize(value: BoardLine, config, indentation, depth, refs, printer) {
    return Array.from(value, (cell) => printer(cell, config, indentation, depth, refs)).join(' ');
  },

  test(value: unknown) {
    return value instanceof BoardLine;
  },
});

expect.addSnapshotSerializer({
  serialize(value: Board, config, indentation, depth, refs, printer) {
    return Array.from(value, (line) => printer(line, config, indentation, depth, refs)).join('\n');
  },

  test(value: unknown) {
    return value instanceof Board;
  },
});

expect.addSnapshotSerializer({
  serialize(value: MatrixSelection, config, indentation, depth, refs, printer) {
    return printer(value.valueOf(), config, indentation, depth, refs);
  },

  test(value: unknown) {
    return value instanceof MatrixSelection;
  },
});
