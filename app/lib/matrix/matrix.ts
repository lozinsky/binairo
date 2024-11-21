import type { MatrixLine, MatrixLineCell } from './matrix-line';

export interface Matrix<L extends MatrixLine<unknown>> {
  at(index: number): L | undefined;
  entries(): Iterable<[number, L]>;
}

export type MatrixCell<M> = M extends Matrix<infer L> ? MatrixLineCell<L> : never;
