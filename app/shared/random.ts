import { type RandomGenerator, uniformIntDistribution, xoroshiro128plus } from 'pure-rand';

import { expectToBeDefined } from '~/shared/expect';

export class Random {
  get seed() {
    return this.#seed;
  }

  #generator: RandomGenerator;
  #seed: number;

  constructor(seed: number) {
    this.#generator = xoroshiro128plus(seed);
    this.#seed = seed;
  }

  static create() {
    return new this(Date.now() ^ (Math.random() * 0x100000000));
  }

  static stable() {
    return new this(0);
  }

  next(from: number, to: number) {
    const [value, generator] = uniformIntDistribution(from, to, this.#generator);

    this.#generator = generator;

    return value;
  }
}

export function sample<T>(target: readonly T[], random: Random) {
  return expectToBeDefined(target[random.next(0, target.length - 1)]);
}

export function shuffle<T>(target: readonly T[], random: Random) {
  const items = [...target];

  for (let prevIndex = 0; prevIndex < items.length; prevIndex++) {
    const nextIndex = random.next(prevIndex, items.length - 1);
    const prevItem = expectToBeDefined(items[prevIndex]);
    const nextItem = expectToBeDefined(items[nextIndex]);

    items[prevIndex] = nextItem;
    items[nextIndex] = prevItem;
  }

  return items;
}
