import { useMemo } from 'react';
import { type Path, useLocation, useResolvedPath } from 'react-router';

import { useReferredSearch } from '~/hooks/use-referred-search';

export function usePushedReferrerResolvedPath(to: Partial<Path> | string, options?: { relative?: 'path' | 'route' }) {
  const location = useLocation();
  const resolvedPath = useResolvedPath(to, options);
  const referredSearch = useReferredSearch(resolvedPath.search, location);
  const pushedReferrerResolvedPath = useMemo<Path>(
    () => ({ hash: resolvedPath.hash, pathname: resolvedPath.pathname, search: referredSearch }),
    [referredSearch, resolvedPath.hash, resolvedPath.pathname],
  );

  return pushedReferrerResolvedPath;
}
