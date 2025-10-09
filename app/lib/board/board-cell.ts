export type BoardCellKind = 'fixed' | 'regular';

export type BoardCellKindRaw = 0 | 1;

export type BoardCellState = 'B' | 'E' | 'R';

export type BoardCellStateRaw = 0 | 1 | 2;

export function isBoardCellKindRaw(value: unknown): value is BoardCellKindRaw {
  return typeof value === 'number' && value in BOARD_CELL_KIND_BY_RAW;
}

export function isBoardCellStateRaw(value: unknown): value is BoardCellStateRaw {
  return typeof value === 'number' && value in BOARD_CELL_STATE_BY_RAW;
}

const NEXT_BOARD_CELL_STATE_BY_PREV_BOARD_CELL_STATE: Readonly<Record<BoardCellState, BoardCellState>> = {
  B: 'E',
  E: 'R',
  R: 'B',
};

const BALANCE_BY_BOARD_CELL_STATE: Readonly<Record<BoardCellState, number>> = {
  B: -1,
  E: 0,
  R: 1,
};

const RAW_BY_BOARD_CELL_KIND: Readonly<Record<BoardCellKind, BoardCellKindRaw>> = {
  fixed: 0,
  regular: 1,
};

const BOARD_CELL_KIND_BY_RAW: Readonly<Record<BoardCellKindRaw, BoardCellKind>> = {
  0: 'fixed',
  1: 'regular',
};

const RAW_BY_BOARD_CELL_STATE: Readonly<Record<BoardCellState, BoardCellStateRaw>> = {
  B: 0,
  E: 2,
  R: 1,
};

const BOARD_CELL_STATE_BY_RAW: Readonly<Record<BoardCellStateRaw, BoardCellState>> = {
  0: 'B',
  1: 'R',
  2: 'E',
};

export type BoardCellValue = readonly [kind: BoardCellKindRaw, state: BoardCellStateRaw];

export class BoardCell {
  get balance() {
    return BALANCE_BY_BOARD_CELL_STATE[this.#state];
  }

  get isEmpty() {
    return this.#state === 'E';
  }

  get isFilled() {
    return !this.isEmpty;
  }

  get isFixed() {
    return this.#kind === 'fixed';
  }

  get state() {
    return this.#state;
  }

  readonly #kind: BoardCellKind;
  readonly #state: BoardCellState;

  constructor(kind: BoardCellKind, state: BoardCellState) {
    this.#kind = kind;
    this.#state = state;
  }

  static create(state: BoardCellState) {
    return new this('regular', state);
  }

  static from(value: BoardCellValue) {
    return new this(BOARD_CELL_KIND_BY_RAW[value[0]], BOARD_CELL_STATE_BY_RAW[value[1]]);
  }

  equals(other: BoardCell) {
    return this.#state === other.#state;
  }

  next() {
    return this.isFixed ? this : new BoardCell(this.#kind, NEXT_BOARD_CELL_STATE_BY_PREV_BOARD_CELL_STATE[this.#state]);
  }

  toFixed() {
    return new BoardCell('fixed', this.#state);
  }

  valueOf(): BoardCellValue {
    return [RAW_BY_BOARD_CELL_KIND[this.#kind], RAW_BY_BOARD_CELL_STATE[this.#state]];
  }
}

export function isBoardCellValue(value: unknown): value is BoardCellValue {
  if (Array.isArray(value) && value.length === 2) {
    return isBoardCellKindRaw(value[0]) && isBoardCellStateRaw(value[1]);
  }

  return false;
}
