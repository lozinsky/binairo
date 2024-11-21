/* @vitest-environment jsdom */

import type { Location, Path } from '@remix-run/react';
import type { ReactNode } from 'react';

import { createRemixStub } from '@remix-run/testing';
import { renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';

import { useReplacedReferrerResolvedPath } from './use-replaced-referrer-resolved-path';

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
])('returns replaced referrer resolved path', ({ location, options, to }) => {
  function Wrapper({ children }: { children: ReactNode }) {
    const RemixStub = createRemixStub([
      { Component, path: '/' },
      { Component, path: '/game' },
      { Component, path: '/game/:board' },
    ]);

    function Component() {
      return children;
    }

    return <RemixStub initialEntries={[location]} />;
  }

  const { result } = renderHook(
    () => {
      const replacedReferrerResolvedPath = useReplacedReferrerResolvedPath(to, options);

      return replacedReferrerResolvedPath;
    },
    { wrapper: Wrapper },
  );

  expect(result.current).toMatchSnapshot();
});
