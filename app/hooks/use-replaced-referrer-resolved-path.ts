import { useMemo } from 'react';
import { type Path, useResolvedPath } from 'react-router';

import { useReferredSearch } from '~/hooks/use-referred-search';
import { useReferrerPath } from '~/hooks/use-referrer-path';

export function useReplacedReferrerResolvedPath(to: Partial<Path> | string, options?: { relative?: 'path' | 'route' }) {
  const referrerPath = useReferrerPath();
  const resolvedPath = useResolvedPath(to, options);
  const referredSearch = useReferredSearch(resolvedPath.search, referrerPath);
  const replacedReferrerResolvedPath = useMemo<Path>(
    () => ({
      hash: resolvedPath.hash,
      pathname: resolvedPath.pathname,
      search: referredSearch,
    }),
    [referredSearch, resolvedPath.hash, resolvedPath.pathname],
  );

  return replacedReferrerResolvedPath;
}
