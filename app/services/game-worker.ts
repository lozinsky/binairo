import '~/globals';

import { expose } from 'comlink';

import { generateBoard } from '~/lib/board-generator';
import { Random } from '~/shared/random';

class GameWorkerHandler {
  static {
    expose(new this());
  }

  generateBoard(size: number) {
    return generateBoard(size, 0.6, Random.create());
  }
}

export type { GameWorkerHandler };
