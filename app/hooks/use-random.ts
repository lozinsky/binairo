import { createContext, use } from 'react';

import { Random } from '~/shared/random';

export const RandomContext = createContext(Random.stable());

export function useRandom() {
  return use(RandomContext);
}
