import {
  DoubleMatrixRotation,
  type Matrix,
  type MatrixReversible,
  type MatrixRotatable,
  type MatrixSelection,
  QuadrupleMatrixRotation,
} from '~/lib/matrix';
import { assert } from '~/shared/assert';
import { expectToBeDefined } from '~/shared/expect';

import type { BoardCell, BoardCellState } from './board-cell';

import { BoardLine, type BoardLineValue, isBoardLineValue } from './board-line';

export type BoardOrientation = 'landscape' | 'portrait';

const NEXT_BOARD_ORIENTATION_BY_PREV_BOARD_ORIENTATION: Readonly<Record<BoardOrientation, BoardOrientation>> = {
  landscape: 'portrait',
  portrait: 'landscape',
};

export type BoardValue = readonly BoardLineValue[];

export class Board implements Iterable<BoardLine>, Matrix<BoardLine>, MatrixReversible<Board>, MatrixRotatable<Board> {
  get length() {
    return this.#lines.length;
  }

  get orientation() {
    return this.#orientation;
  }

  get progress() {
    return this.#lines.reduce((progress, line) => progress + line.progress, 0) / this.#lines.length;
  }

  readonly #lines: readonly BoardLine[];
  readonly #orientation: BoardOrientation;

  constructor(orientation: BoardOrientation, lines: readonly BoardLine[]) {
    for (const line of lines) {
      assert(line.length === lines.length, 'Expected line length to be equal to board size');
    }

    this.#lines = lines;
    this.#orientation = orientation;
  }

  static blank(size: number) {
    return new this(
      'portrait',
      Array.from({ length: size }, () => BoardLine.blank(size)),
    );
  }

  static create(states: ReadonlyArray<readonly BoardCellState[]>) {
    return new this(
      'portrait',
      states.map((states) => BoardLine.create(states)),
    );
  }

  static from(value: BoardValue) {
    return new this(
      'portrait',
      value.map((value) => BoardLine.from(value)),
    );
  }

  at(index: number) {
    return this.#lines.at(index);
  }

  entries() {
    return this.#lines.entries();
  }

  replace(index: number, callback: (line: BoardLine) => BoardLine) {
    return new Board(this.#orientation, this.#lines.with(index, callback(expectToBeDefined(this.#lines.at(index)))));
  }

  replaceBy(selection: MatrixSelection, callback: (cell: BoardCell) => BoardCell) {
    const content = selection.execute(this);
    const lines = this.#lines.map((line) => {
      const cells = Array.from(line);

      for (const cell of content) {
        const index = line.indexOf(cell);

        if (index === -1) {
          continue;
        }

        cells[index] = callback(expectToBeDefined(cells[index]));
      }

      return new BoardLine(cells);
    });

    return new Board(this.#orientation, lines);
  }

  reverse() {
    return new Board(this.#orientation, this.#lines.toReversed());
  }

  rotate() {
    const orientation = NEXT_BOARD_ORIENTATION_BY_PREV_BOARD_ORIENTATION[this.#orientation];

    if (this.#lines.length === 0) {
      return new Board(orientation, []);
    }

    const lines: BoardLine[] = [];

    for (const index of expectToBeDefined(this.#lines[0]).keys()) {
      const cells: BoardCell[] = [];

      for (const line of this.#lines) {
        cells.push(expectToBeDefined(line.at(index)));
      }

      lines.push(new BoardLine(cells));
    }

    return new Board(orientation, lines);
  }

  slice(start: number, end?: number) {
    return this.#lines.slice(start, end);
  }

  [Symbol.iterator]() {
    return this.#lines[Symbol.iterator]();
  }

  toDoubleRotation() {
    return DoubleMatrixRotation.run<Board>(this);
  }

  toQuadrupleRotation() {
    return QuadrupleMatrixRotation.run<Board>(this);
  }

  valueOf(): BoardValue {
    return this.#lines.map((line) => line.valueOf());
  }
}

export function isBoardValue(value: unknown): value is BoardValue {
  return Array.isArray(value) && value.every(isBoardLineValue);
}
