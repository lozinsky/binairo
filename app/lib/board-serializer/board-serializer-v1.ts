import { Board, isBoardValue } from '~/lib/board';
import { decodeURLBase64, encodeURLBase64 } from '~/shared/url-base64';

import { type BoardSerializer, BoardSerializerDeserializeError } from './board-serializer';

export class BoardSerializerV1 implements BoardSerializer {
  deserialize(data: string): Board {
    let value: unknown;

    try {
      value = JSON.parse(decodeURLBase64(data));
    } catch (error) {
      throw new BoardSerializerDeserializeError('Failed to deserialize board', { cause: error });
    }

    if (!isBoardValue(value)) {
      throw new BoardSerializerDeserializeError('Deserialized value is not a valid board');
    }

    return Board.from(value);
  }

  serialize(board: Board): string {
    return encodeURLBase64(JSON.stringify(board.valueOf()));
  }
}
