/* @vitest-environment jsdom */

import type { Location } from '@remix-run/react';
import type { ReactNode } from 'react';

import { createRemixStub } from '@remix-run/testing';
import { renderHook } from '@testing-library/react';
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
    const RemixStub = createRemixStub([{ Component, path: '/' }]);

    function Component() {
      return children;
    }

    return <RemixStub initialEntries={[location]} />;
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
