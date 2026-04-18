import type { RandomGenerator } from 'pure-rand/types/RandomGenerator';

import { uniformInt } from 'pure-rand/distribution/uniformInt';
import { xoroshiro128plus, xoroshiro128plusFromState } from 'pure-rand/generator/xoroshiro128plus';

import { expectToBeDefined } from '~/shared/expect';

export class Random {
  get state() {
    return this.#generator.getState();
  }

  readonly #generator: RandomGenerator;

  constructor(generator: RandomGenerator) {
    this.#generator = generator;
  }

  static create() {
    return new this(xoroshiro128plus(Date.now() ^ (Math.random() * 0x1_00_00_00_00)));
  }

  static from(state: readonly number[]) {
    return new this(xoroshiro128plusFromState(state));
  }

  static stable() {
    return new this(xoroshiro128plus(0));
  }

  next(from: number, to: number) {
    return uniformInt(this.#generator, from, to);
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
