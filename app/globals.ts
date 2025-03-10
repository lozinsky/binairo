import 'ios-vibrator-pro-max';
import { type TransferHandler, transferHandlers } from 'comlink';

import { Board, type BoardValue } from '~/lib/board';

const boardTransferHandler: TransferHandler<Board, BoardValue> = {
  canHandle(value) {
    return value instanceof Board;
  },
  deserialize(value) {
    return Board.from(value);
  },
  serialize(value) {
    return [value.valueOf(), []];
  },
};

transferHandlers.set('Board', boardTransferHandler);
