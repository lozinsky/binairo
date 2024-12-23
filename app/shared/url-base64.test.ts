import { expect, test } from 'vitest';

import { decodeURLBase64, encodeURLBase64 } from './url-base64';

test.each([
  new Uint8Array([]),
  new Uint8Array([104]),
  new Uint8Array([108, 194, 177]),
  new Uint8Array([89, 44, 194, 170]),
  new Uint8Array([195, 191, 195, 191, 194, 190, 195, 191, 195, 175, 194, 191, 195, 187, 195, 175, 195, 191]),
])('encodes "%s" string to url base64', (value) => {
  expect(encodeURLBase64(new TextDecoder().decode(value))).toMatchSnapshot();
});

test.each(['', 'aA==', 'aA', 'bLE=', 'bLE', 'WSyq', '__--_--_--__'])('decodes "%s" string from url base64', (value) => {
  expect(new TextEncoder().encode(decodeURLBase64(value))).toMatchSnapshot();
});
