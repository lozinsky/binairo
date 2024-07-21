import type * as GameWorker from '~/services/game-worker';

export const { generateBoard } = new ComlinkWorker<typeof GameWorker>(
  new URL('~/services/game-worker', import.meta.url),
);
