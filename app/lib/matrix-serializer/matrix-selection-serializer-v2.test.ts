import { expect, test } from 'vitest';

import { MatrixSelection } from '~/lib/matrix';

import { MatrixSelectionSerializerV2 } from './matrix-selection-serializer-v2';

test.each(['', '-0-0-0-0-0-1-1-1', '0-0-0-0-0-1-1'])('throws on invalid data', (data) => {
  expect(() => new MatrixSelectionSerializerV2().deserialize(data)).toThrowErrorMatchingSnapshot();
});

test.each(['0-0-0-0-0-1-1-1', '0-0-0-0-0-1-1-1-0-2-2-2', '1-1-10-10-100-100-1000-1000-10000-10000'])(
  'returns matrix selection from string',
  (data) => {
    expect(new MatrixSelectionSerializerV2().deserialize(data)).toMatchSnapshot();
  },
);

test.each([
  new MatrixSelection([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]),
  new MatrixSelection([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
  ]),
  new MatrixSelection([
    { x: 1, y: 1 },
    { x: 10, y: 10 },
    { x: 100, y: 100 },
    { x: 1000, y: 1000 },
    { x: 10000, y: 10000 },
  ]),
])('returns matrix selection string', (selection) => {
  expect(new MatrixSelectionSerializerV2().serialize(selection)).toMatchSnapshot();
});
