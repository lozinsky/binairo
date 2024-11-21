import type { Matrix, MatrixCell } from './matrix';
import type { MatrixLine } from './matrix-line';

export interface MatrixSelectionPosition {
  readonly x: number;
  readonly y: number;
}

export class MatrixSelection {
  get length() {
    return this.#positions.length;
  }

  readonly #positions: readonly MatrixSelectionPosition[];

  constructor(positions: readonly MatrixSelectionPosition[]) {
    this.#positions = positions;
  }

  static collect<M extends Matrix<MatrixLine<unknown>>>(matrix: M, cells: ReadonlyArray<MatrixCell<M>>) {
    const positions: MatrixSelectionPosition[] = [];

    for (const [y, line] of matrix.entries()) {
      for (const [x, cell] of line.entries()) {
        for (const other of cells) {
          if (cell === other) {
            positions.push({ x, y });
          }
        }
      }
    }

    return new this(positions);
  }

  static concat(...selections: readonly MatrixSelection[]) {
    const positions: MatrixSelectionPosition[] = [];

    for (const selection of selections) {
      positions.push(...selection.#positions);
    }

    return new this(positions);
  }

  static parse(value: string) {
    return new this(JSON.parse(atob(value)) as readonly MatrixSelectionPosition[]);
  }

  exclude(other: MatrixSelection) {
    const positions: MatrixSelectionPosition[] = [...this.#positions];

    for (const position of other.#positions) {
      const index = positions.findIndex((other) => other.x === position.x && other.y === position.y);

      if (index === -1) {
        continue;
      }

      positions.splice(index, 1);
    }

    return new MatrixSelection(positions);
  }

  execute<M extends Matrix<MatrixLine<unknown>>>(matrix: M) {
    const cells: Array<MatrixCell<M>> = [];

    for (const position of this.#positions) {
      const line = matrix.at(position.y);

      if (line === undefined) {
        continue;
      }

      const cell = line.at(position.x);

      if (cell === undefined) {
        continue;
      }

      cells.push(cell as MatrixCell<M>);
    }

    return cells;
  }

  toString() {
    return btoa(JSON.stringify(this.valueOf()));
  }

  valueOf() {
    return this.#positions;
  }
}
