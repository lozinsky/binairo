import type { Board } from '~/lib/board';

export interface BoardSerializer {
  deserialize(data: string): Board;
  serialize(board: Board): string;
}

export class BoardSerializerDeserializeError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);

    this.name = 'BoardSerializerDeserializeError';
  }
}
