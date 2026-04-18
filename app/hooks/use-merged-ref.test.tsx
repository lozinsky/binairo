/* @vitest-environment jsdom */

import { renderHook } from '@testing-library/react';
import { useImperativeHandle, useRef } from 'react';
import { expect, test, vi } from 'vitest';

import { useMergedRef } from './use-merged-ref';

test.each([() => [], () => [null, null], () => [undefined, undefined], () => [null, undefined]])(
  'returns "null" if no refs defined',
  (useRefs) => {
    const { result } = renderHook(() => {
      const refs = useRefs();
      const mergedRef = useMergedRef(refs);

      useImperativeHandle(mergedRef, () => 'value');

      return { mergedRef, refs };
    });

    expect(result.current.mergedRef).toMatchSnapshot();
  },
);

test.each([
  () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);

    return [ref1, ref2, null, undefined];
  },
  () => {
    const ref1 = vi.fn();
    const ref2 = vi.fn();

    return [ref1, ref2, null, undefined];
  },
  () => {
    const ref1 = useRef(null);
    const ref2 = vi.fn();

    return [ref1, ref2, null, undefined];
  },
])('returns merged ref', (useRefs) => {
  const { result } = renderHook(() => {
    const refs = useRefs();
    const mergedRef = useMergedRef(refs);

    useImperativeHandle(mergedRef, () => 'value');

    return { mergedRef, refs };
  });

  expect(result.current.refs).toMatchSnapshot();
});
