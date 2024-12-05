/* @vitest-environment jsdom */

import type { ReactNode } from 'react';
import type { Location } from 'react-router';

import { renderHook } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { expect, test } from 'vitest';

import { useReferrerPath } from './use-referrer-path';

test.each<{ location: Partial<Location> }>([
  {
    location: {
      search: '',
    },
  },
  {
    location: {
      search: '?referrer=%2F',
    },
  },
  {
    location: {
      search: '?referrer=%2Fgame%3Freferrer%3D%252F',
    },
  },
  {
    location: {
      search: `?referrer=%2Fgame%2FW1tbMSwyXSxbMSwyXV0sW1swLDBdLFswLDFdXV0%3D%3Freferrer%3D%252Fgame%253Freferrer%253D%25252F`,
    },
  },
])('returns referrer path', ({ location }) => {
  function Wrapper({ children }: { children: ReactNode }) {
    const RouterStub = createRoutesStub([{ Component, path: '/' }]);

    function Component() {
      return children;
    }

    return <RouterStub initialEntries={[location]} />;
  }

  const { result } = renderHook(
    () => {
      const referrerPath = useReferrerPath();

      return referrerPath;
    },
    { wrapper: Wrapper },
  );

  expect(result.current).toMatchSnapshot();
});
