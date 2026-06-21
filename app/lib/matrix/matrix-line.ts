export interface MatrixLine<C> {
  at: (index: number) => C | undefined;
  entries: () => Iterable<[number, C]>;
}

export type MatrixLineCell<L> = L extends MatrixLine<infer C> ? C : never;
