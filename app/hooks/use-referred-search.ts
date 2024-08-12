import { createPath, type Path } from '@remix-run/react';
import { useMemo } from 'react';

export function useReferredSearch(search: string, referrerPath: null | Partial<Path>) {
  const referredSearch = useMemo(() => {
    const searchParams = new URLSearchParams(search);

    if (referrerPath !== null) {
      searchParams.set('referrer', createPath(referrerPath));
    }

    const searchParamsString = searchParams.toString();

    return searchParamsString === '' ? searchParamsString : `?${searchParamsString}`;
  }, [referrerPath, search]);

  return referredSearch;
}
