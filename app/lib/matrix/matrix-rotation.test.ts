import { expect, test } from 'vitest';

import {
  DoubleMatrixRotation,
  type MatrixReversible,
  type MatrixRotatable,
  QuadrupleMatrixRotation,
} from './matrix-rotation';

test('double rotates', () => {
  class Target implements MatrixRotatable<Target> {
    readonly name: string;

    constructor(name: string) {
      this.name = name;
    }

    rotate() {
      return new Target(`rotated ${this.name}`);
    }
  }

  const rotation = new DoubleMatrixRotation(new Target('target'));

  expect(rotation.rotate(0)).toMatchSnapshot();
  expect(rotation.rotate(1)).toMatchSnapshot();
  expect(rotation.rotate(2)).toMatchSnapshot();
});

test('quadruple rotates', () => {
  class Target implements MatrixReversible<Target>, MatrixRotatable<Target> {
    readonly name: string;

    constructor(name: string) {
      this.name = name;
    }

    reverse() {
      return new Target(`reversed ${this.name}`);
    }

    rotate() {
      return new Target(`rotated ${this.name}`);
    }
  }

  const rotation = new QuadrupleMatrixRotation(new Target('target'));

  expect(rotation.rotate(0)).toMatchSnapshot();
  expect(rotation.rotate(1)).toMatchSnapshot();
  expect(rotation.rotate(2)).toMatchSnapshot();
  expect(rotation.rotate(3)).toMatchSnapshot();
  expect(rotation.rotate(4)).toMatchSnapshot();
});
