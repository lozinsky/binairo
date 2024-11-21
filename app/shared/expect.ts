import { assert } from '~/shared/assert';

export function expectNotToBeNaN(value: number, message?: string) {
  assert(!Number.isNaN(value), message ?? 'Expected value not to be "NaN"');

  return value;
}

export function expectToBeDefined<T>(value: T, message?: string) {
  assert(value != null, message ?? 'Expected value to be defined');

  return value;
}

export function expectToSatisfy<T>(value: unknown, predicate: (value: unknown) => value is T, message?: string) {
  assert(predicate(value), message ?? 'Expected value to satisfy the predicate');

  return value;
}
