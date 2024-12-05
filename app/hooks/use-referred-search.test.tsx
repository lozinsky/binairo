/* @vitest-environment jsdom */

import type { ReactNode } from 'react';

import { renderHook } from '@testing-library/react';
import { type Location, type Path, useLocation } from 'react-router';
import { createRoutesStub } from 'react-router';
import { expect, test } from 'vitest';

import { useReferredSearch } from './use-referred-search';

test.each<{ location: Partial<Location>; referrerPath: null | Partial<Path> }>([
  {
    location: { search: '' },
    referrerPath: null,
  },
  {
    location: { search: '' },
    referrerPath: { pathname: '/', search: '' },
  },
  {
    location: { search: '' },
    referrerPath: { pathname: '/game', search: '?referrer=%2F' },
  },
  {
    location: { search: '?analyze' },
    referrerPath: null,
  },
  {
    location: { search: '?analyze' },
    referrerPath: { pathname: '/game', search: '?referrer=%2F' },
  },
])('returns referred search', ({ location, referrerPath }) => {
  function Wrapper({ children }: { children: ReactNode }) {
    const RouterStub = createRoutesStub([{ Component, path: '/' }]);

    function Component() {
      return children;
    }

    return <RouterStub initialEntries={[location]} />;
  }

  const { result } = renderHook(
    () => {
      const location = useLocation();
      const referredSearch = useReferredSearch(location.search, referrerPath);

      return referredSearch;
    },
    { wrapper: Wrapper },
  );

  expect(result.current).toMatchSnapshot();
});
