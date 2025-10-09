class AssertionError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = 'AssertionError';
  }
}

export function assert(condition: boolean, message?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(message ?? 'Expected condition to be true');
  }
}

export function unreachable(message?: string): never {
  throw new AssertionError(message ?? 'Reached unreachable code');
}
