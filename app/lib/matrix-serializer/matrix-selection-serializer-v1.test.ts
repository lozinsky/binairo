import { expect, test } from 'vitest';

import { MatrixSelection } from '~/lib/matrix';

import { MatrixSelectionSerializerV1 } from './matrix-selection-serializer-v1';

test.each([
  '',
  '-W3sieCI6MCwieSI6MH0seyJ4IjowLCJ5IjowfSx7IngiOjAsInkiOjF9LHsieCI6MSwieSI6MX1d',
  'W3sieCI6MCwieSI6MH0seyJ4IjowLCJ5IjowfSx7IngiOjAsInkiOjF9LHsieCI6MX1d',
  'W3sieCI6MCwieSI6MH0seyJ4IjowLCJ5IjowfSx7IngiOjAsInkiOjF9LHsieCI6MSwieSI6MX0',
])('throws on invalid data', (data) => {
  expect(() => new MatrixSelectionSerializerV1().deserialize(data)).toThrowErrorMatchingSnapshot();
});

test.each([
  'W3sieCI6MCwieSI6MH0seyJ4IjowLCJ5IjowfSx7IngiOjAsInkiOjF9LHsieCI6MSwieSI6MX1d',
  'W3sieCI6MCwieSI6MH0seyJ4IjowLCJ5IjowfSx7IngiOjAsInkiOjF9LHsieCI6MSwieSI6MX0seyJ4IjowLCJ5IjoyfSx7IngiOjIsInkiOjJ9XQ',
  'W3sieCI6MSwieSI6MX0seyJ4IjoxMCwieSI6MTB9LHsieCI6MTAwLCJ5IjoxMDB9LHsieCI6MTAwMCwieSI6MTAwMH0seyJ4IjoxMDAwMCwieSI6MTAwMDB9XQ',
])('returns matrix selection from string', (data) => {
  expect(new MatrixSelectionSerializerV1().deserialize(data)).toMatchSnapshot();
});

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
  expect(new MatrixSelectionSerializerV1().serialize(selection)).toMatchSnapshot();
});
