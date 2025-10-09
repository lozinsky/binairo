import { Board, type BoardCellValue, isBoardCellKindRaw, isBoardCellStateRaw } from '~/lib/board';

import { type BoardSerializer, BoardSerializerDeserializeError } from './board-serializer';

export class BoardSerializerV2 implements BoardSerializer {
  deserialize(data: string): Board {
    let length = 0;
    let board = '';

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      if (element === '-') {
        length = Number(data.slice(0, index));
        board = data.slice(index + 1);
        break;
      }
    }

    if (Number.isNaN(length) || length === 0) {
      throw new BoardSerializerDeserializeError('Invalid board length');
    }

    const value: BoardCellValue[][] = [];

    for (let y = 0; y < length; y++) {
      const line: BoardCellValue[] = [];
      const skip = y * length * 2;

      for (let x = 0; x < length; x++) {
        const index = skip + x * 2;
        const kind = Number(board[index]);
        const state = Number(board[index + 1]);

        if (!isBoardCellKindRaw(kind)) {
          throw new BoardSerializerDeserializeError('Invalid board cell kind');
        }

        if (!isBoardCellStateRaw(state)) {
          throw new BoardSerializerDeserializeError('Invalid board cell state');
        }

        line.push([kind, state]);
      }

      value.push(line);
    }

    return Board.from(value);
  }

  serialize(board: Board): string {
    return `${board.length}-${board.valueOf().flat(2).join('')}`;
  }
}
