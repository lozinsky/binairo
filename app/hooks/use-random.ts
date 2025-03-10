import { createContext, use } from 'react';

import { Random } from '~/shared/random';

export const RandomStateContext = createContext<readonly number[]>([]);

export function useRandom() {
  const state = use(RandomStateContext);
  const random = Random.from(state);

  return random;
}
