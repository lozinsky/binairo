import { useMemo } from 'react';
import { parsePath, useLocation } from 'react-router';

export function useReferrerPath() {
  const location = useLocation();
  const referrerPath = useMemo(() => {
    const referrer = new URLSearchParams(location.search).get('referrer');

    if (referrer === null) {
      return null;
    }

    return parsePath(referrer);
  }, [location.search]);

  return referrerPath;
}
