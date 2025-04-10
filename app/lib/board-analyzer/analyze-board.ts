import type { Board } from '~/lib/board';
import type { Random } from '~/shared/random';

import { analyzeBoardByKind } from './analyze-board-by-kind';

export function analyzeBoard(target: Board, random: Random) {
  return analyzeBoardByKind('correction', target, random) ?? analyzeBoardByKind('suggestion', target, random);
}
