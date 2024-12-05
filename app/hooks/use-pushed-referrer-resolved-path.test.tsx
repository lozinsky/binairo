/* @vitest-environment jsdom */

import type { ReactNode } from 'react';
import type { Location, Path } from 'react-router';

import { renderHook } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { expect, test } from 'vitest';

import { usePushedReferrerResolvedPath } from './use-pushed-referrer-resolved-path';

test.each<{ location: Partial<Location>; options?: { relative?: 'path' | 'route' }; to: Partial<Path> | string }>([
  {
    location: {
      pathname: '/',
      search: '',
    },
    to: '/game',
  },
  {
    location: {
      pathname: '/game',
      search: '?referrer=%2F',
    },
    to: '/game/new/2',
  },
  {
    location: {
      pathname: '/game/W1tbMSwyXSxbMSwyXV0sW1swLDBdLFswLDFdXV0=',
      search: '?referrer=%2Fgame%3Freferrer%3D%252F',
    },
    to: '/settings',
  },
  {
    location: {
      pathname: '/',
      search: '',
    },
    to: './game',
  },
  {
    location: {
      pathname: '/game',
      search: '?referrer=%2F',
    },
    to: './new/2',
  },
  {
    location: {
      pathname: '/game/W1tbMSwyXSxbMSwyXV0sW1swLDBdLFswLDFdXV0=',
      search: '?referrer=%2Fgame%3Freferrer%3D%252F',
    },
    to: '../../settings',
  },
  {
    location: {
      pathname: '/',
      search: '',
    },
    options: { relative: 'path' },
    to: './game',
  },
  {
    location: {
      pathname: '/game',
      search: '?referrer=%2F',
    },
    options: { relative: 'path' },
    to: './new/2',
  },
  {
    location: {
      pathname: '/game/W1tbMSwyXSxbMSwyXV0sW1swLDBdLFswLDFdXV0=',
      search: '?referrer=%2Fgame%3Freferrer%3D%252F',
    },
    options: { relative: 'path' },
    to: '../../settings',
  },
])('returns pushed referrer resolved path', ({ location, options, to }) => {
  function Wrapper({ children }: { children: ReactNode }) {
    const RouterStub = createRoutesStub([
      { Component, path: '/' },
      { Component, path: '/game' },
      { Component, path: '/game/:board' },
    ]);

    function Component() {
      return children;
    }

    return <RouterStub initialEntries={[location]} />;
  }

  const { result } = renderHook(
    () => {
      const pushedReferrerResolvedPath = usePushedReferrerResolvedPath(to, options);

      return pushedReferrerResolvedPath;
    },
    { wrapper: Wrapper },
  );

  expect(result.current).toMatchSnapshot();
});
