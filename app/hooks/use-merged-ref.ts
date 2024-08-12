import { type MutableRefObject, type Ref, useMemo } from 'react';

export function useMergedRef<T>(refs: ReadonlyArray<Ref<T> | undefined>) {
  const mergedRef = useMemo<Ref<T>>(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (value) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          (ref as MutableRefObject<null | T>).current = value;
        }
      }
    };
  }, refs); // eslint-disable-line react-hooks/exhaustive-deps

  return mergedRef;
}
