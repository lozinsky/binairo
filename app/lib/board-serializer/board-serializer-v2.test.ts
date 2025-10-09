import { expect, test } from 'vitest';

import { Board, BoardCell, BoardLine } from '~/lib/board';

import { BoardSerializerV2 } from './board-serializer-v2';

test.each([
  '',
  '4-1201001010110001011011100000010',
  '4-12010010101100010110111000000121',
  '-12010010101100010110111000000101',
  '12010010101100010110111000000101',
])('throws on invalid data', (data) => {
  expect(() => new BoardSerializerV2().deserialize(data)).toThrowErrorMatchingSnapshot();
});

test.each([
  '4-12010010101100010110111000000101',
  '6-120010010001001101100001111010110110101100110100110001000001001101001100',
])('returns board from string', (data) => {
  expect(new BoardSerializerV2().deserialize(data)).toMatchSnapshot();
});

test.each([
  new Board('portrait', [
    new BoardLine([
      new BoardCell('regular', 'E'),
      new BoardCell('fixed', 'R'),
      new BoardCell('fixed', 'B'),
      new BoardCell('regular', 'B'),
    ]),
    new BoardLine([
      new BoardCell('regular', 'B'),
      new BoardCell('regular', 'R'),
      new BoardCell('fixed', 'B'),
      new BoardCell('fixed', 'R'),
    ]),
    new BoardLine([
      new BoardCell('fixed', 'R'),
      new BoardCell('regular', 'B'),
      new BoardCell('regular', 'R'),
      new BoardCell('regular', 'B'),
    ]),
    new BoardLine([
      new BoardCell('fixed', 'B'),
      new BoardCell('fixed', 'B'),
      new BoardCell('fixed', 'R'),
      new BoardCell('fixed', 'R'),
    ]),
  ]),
  new Board('portrait', [
    new BoardLine([
      new BoardCell('regular', 'E'),
      new BoardCell('fixed', 'B'),
      new BoardCell('regular', 'B'),
      new BoardCell('fixed', 'R'),
      new BoardCell('fixed', 'B'),
      new BoardCell('fixed', 'R'),
    ]),
    new BoardLine([
      new BoardCell('fixed', 'B'),
      new BoardCell('regular', 'R'),
      new BoardCell('fixed', 'R'),
      new BoardCell('regular', 'B'),
      new BoardCell('fixed', 'B'),
      new BoardCell('fixed', 'R'),
    ]),
    new BoardLine([
      new BoardCell('regular', 'R'),
      new BoardCell('regular', 'B'),
      new BoardCell('regular', 'B'),
      new BoardCell('regular', 'R'),
      new BoardCell('fixed', 'R'),
      new BoardCell('regular', 'B'),
    ]),
    new BoardLine([
      new BoardCell('regular', 'B'),
      new BoardCell('regular', 'R'),
      new BoardCell('fixed', 'B'),
      new BoardCell('regular', 'R'),
      new BoardCell('fixed', 'R'),
      new BoardCell('fixed', 'B'),
    ]),
    new BoardLine([
      new BoardCell('regular', 'R'),
      new BoardCell('fixed', 'B'),
      new BoardCell('fixed', 'R'),
      new BoardCell('fixed', 'B'),
      new BoardCell('fixed', 'B'),
      new BoardCell('fixed', 'R'),
    ]),
    new BoardLine([
      new BoardCell('fixed', 'B'),
      new BoardCell('regular', 'R'),
      new BoardCell('fixed', 'R'),
      new BoardCell('fixed', 'B'),
      new BoardCell('regular', 'R'),
      new BoardCell('fixed', 'B'),
    ]),
  ]),
])('returns board string', (board) => {
  expect(new BoardSerializerV2().serialize(board)).toMatchSnapshot();
});
