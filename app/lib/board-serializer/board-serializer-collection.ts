import type { Board } from '~/lib/board/board';

import { unreachable } from '~/shared/assert';
import { expectToBeDefined } from '~/shared/expect';

import { type BoardSerializer, BoardSerializerDeserializeError } from './board-serializer';
import { BoardSerializerV1 } from './board-serializer-v1';
import { BoardSerializerV2 } from './board-serializer-v2';

const BOARD_SERIALIZERS: readonly BoardSerializer[] = [new BoardSerializerV2(), new BoardSerializerV1()];

export function deserializeBoard(data: string): Board {
  for (const serializer of BOARD_SERIALIZERS) {
    try {
      return serializer.deserialize(data);
    } catch (error) {
      if (error instanceof BoardSerializerDeserializeError) {
        continue;
      }

      throw error;
    }
  }

  unreachable();
}

export function serializeBoard(board: Board) {
  return expectToBeDefined(BOARD_SERIALIZERS.at(0)).serialize(board);
}
