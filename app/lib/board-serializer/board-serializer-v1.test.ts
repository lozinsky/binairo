import { expect, test } from 'vitest';

import { Board, BoardCell, BoardLine } from '~/lib/board';

import { BoardSerializerV1 } from './board-serializer-v1';

test.each([
  '',
  '-W1tbMSwyXSxbMCwxXSxbMCwwXSxbMSwwXV0sW1sxLDBdLFsxLDFdLFswLDBdLFswLDFdXSxbWzAsMV0sWzEsMF0sWzEsMV0sWzEsMF1dLFtbMCwwXSxbMCwwXSxbMCwxXSxbMCwxXV1d',
  'W1tbMSwyXSxbMCwxXSxbMCwwXSxbMSwwXV0sW1sxLDBdLFsxLDFdLFswLDBdLFswLDFdXSxbWzAsMV0sWzEsMF0sWzEsMV0sWzEsMF1dLFtbMCwwXSxbMCwwXSxbMCwxXSxbMCwxXV0',
  'W1tbMSwyXSxbMCwxXSxbMCwwXSxbMSwwXV0sW1sxLDBdLFsxLDFdLFswLDBdLFswLDFdXSxbWzAsMV0sWzEsMF0sWzEsMV0sWzEsMF1dLFtbMCwwXSxbMCwwXSxbMCwxXSxbMF1dXQ',
])('throws on invalid data', (data) => {
  expect(() => new BoardSerializerV1().deserialize(data)).toThrowErrorMatchingSnapshot();
});

test.each([
  'W1tbMSwyXSxbMCwxXSxbMCwwXSxbMSwwXV0sW1sxLDBdLFsxLDFdLFswLDBdLFswLDFdXSxbWzAsMV0sWzEsMF0sWzEsMV0sWzEsMF1dLFtbMCwwXSxbMCwwXSxbMCwxXSxbMCwxXV1d',
  'W1tbMSwyXSxbMCwwXSxbMSwwXSxbMCwxXSxbMCwwXSxbMCwxXV0sW1swLDBdLFsxLDFdLFswLDFdLFsxLDBdLFswLDBdLFswLDFdXSxbWzEsMV0sWzEsMF0sWzEsMF0sWzEsMV0sWzAsMV0sWzEsMF1dLFtbMSwwXSxbMSwxXSxbMCwwXSxbMSwxXSxbMCwxXSxbMCwwXV0sW1sxLDFdLFswLDBdLFswLDFdLFswLDBdLFswLDBdLFswLDFdXSxbWzAsMF0sWzEsMV0sWzAsMV0sWzAsMF0sWzEsMV0sWzAsMF1dXQ',
])('returns board from string', (data) => {
  expect(new BoardSerializerV1().deserialize(data)).toMatchSnapshot();
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
  expect(new BoardSerializerV1().serialize(board)).toMatchSnapshot();
});
