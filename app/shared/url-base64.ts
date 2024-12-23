import { expectToBeDefined } from '~/shared/expect';

const PADDING_REGEX = /[.=]{1,2}$/;

const URL_UNSAFE_CHAR_REGEX = /[+/]/g;

const URL_SAFE_CHAR_REGEX = /[-_]/g;

const URL_UNSAFE_CHAR_BY_URL_SAFE_CHAR: Record<string, string> = {
  '-': '+',
  _: '/',
};

const URL_SAFE_CHAR_BY_URL_UNSAFE_CHAR: Record<string, string> = {
  '+': '-',
  '/': '_',
};

export function decodeURLBase64(value: string) {
  return atob(
    value.replaceAll(URL_SAFE_CHAR_REGEX, (substring) =>
      expectToBeDefined(URL_UNSAFE_CHAR_BY_URL_SAFE_CHAR[substring]),
    ),
  );
}

export function encodeURLBase64(value: string) {
  return btoa(value)
    .replaceAll(URL_UNSAFE_CHAR_REGEX, (substring) => expectToBeDefined(URL_SAFE_CHAR_BY_URL_UNSAFE_CHAR[substring]))
    .replace(PADDING_REGEX, '');
}
