import { expect, test, vi } from 'vitest';

import { resolvePathname } from './url';

test.each([
  ['/settings', '/'],
  ['/settings', '/binairo/'],
  ['/game/:board', '/'],
  ['/game/:board', '/binairo/'],
])('resolves "%s" pathname if `BASE_URL` environment variable is "%s"', (actual, baseUrl) => {
  vi.stubEnv('BASE_URL', baseUrl);

  expect(resolvePathname(actual)).toMatchSnapshot();
});
