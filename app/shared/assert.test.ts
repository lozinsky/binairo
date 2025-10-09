import { expect, test } from 'vitest';

import { assert, unreachable } from './assert';

test('does not throw if condition is "true"', () => {
  expect(() => {
    assert(true);
  }).not.toThrow();
});

test('throws if condition is "false"', () => {
  expect(() => {
    assert(false);
  }).toThrowErrorMatchingSnapshot();
});

test('throws if condition is "false" with message', () => {
  expect(() => {
    assert(false, 'Message');
  }).toThrowErrorMatchingSnapshot();
});

test('unreachable always throws', () => {
  expect(() => {
    unreachable();
  }).toThrowErrorMatchingSnapshot();
});
