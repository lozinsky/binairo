import { type Ref, useMemo } from 'react';

export function useMergedRef<T>(refs: ReadonlyArray<Ref<T> | undefined>) {
  const mergedRef = useMemo<Ref<T>>(() => {
    if (refs.every((ref) => ref === null || ref === undefined)) {
      return null;
    }

    return (value) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref !== null && ref !== undefined) {
          ref.current = value;
        }
      }
    };
  }, refs);

  return mergedRef;
}
