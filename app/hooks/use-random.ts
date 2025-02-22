import { createContext, use } from 'react';

import { Random } from '~/shared/random';

export const RandomSeedContext = createContext(0);

export function useRandom() {
  const seed = use(RandomSeedContext);
  const random = new Random(seed);

  return random;
}
