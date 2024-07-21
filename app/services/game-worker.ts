import '~/globals';

import * as BoardGenerator from '~/lib/board-generator';
import { Random } from '~/shared/random';

export function generateBoard(size: number) {
  return BoardGenerator.generateBoard(size, 0.6, Random.create());
}
