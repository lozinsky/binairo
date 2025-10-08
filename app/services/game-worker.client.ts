import { wrap } from 'comlink';

import type { GameWorkerHandler } from '~/services/game-worker';

import GameWorker from '~/services/game-worker?worker';

export const { generateBoard } = wrap<GameWorkerHandler>(new GameWorker());
