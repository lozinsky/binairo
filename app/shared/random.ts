import { type RandomGenerator, uniformIntDistribution, xoroshiro128plus } from 'pure-rand';

import { expectToBeDefined } from '~/shared/expect';

export class Random {
  get state() {
    return this.#generator.getState();
  }

  #generator: RandomGenerator;

  constructor(generator: RandomGenerator) {
    this.#generator = generator;
  }

  static create() {
    return new this(xoroshiro128plus(Date.now() ^ (Math.random() * 0x100000000)));
  }

  static from(state: readonly number[]) {
    return new this(xoroshiro128plus.fromState(state));
  }

  static stable() {
    return new this(xoroshiro128plus(0));
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
