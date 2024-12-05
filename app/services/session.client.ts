import type { Cookie, Session, SessionStorage } from 'react-router';

import { parse, type ParseOptions, serialize, type SerializeOptions } from 'cookie';

import type { SessionData } from '~/services/session';

import { expectToBeDefined } from '~/shared/expect';

type FlashDataKey<K extends string> = `__flash_${K}__`;

type FlashSessionData<T, F> = Partial<T & { [K in keyof F as FlashDataKey<K & string>]: F[K] }>;

type SessionDataValue<K, T, F = T> =
  | (K extends keyof F ? F[K] : undefined)
  | (K extends keyof T ? T[K] : undefined)
  | undefined;

class ClientCookie implements Cookie {
  readonly isSigned = false;

  get expires() {
    return this.#options.maxAge === undefined ? undefined : new Date(Date.now() + this.#options.maxAge * 1000);
  }

  get name() {
    return this.#name;
  }

  readonly #name: string;
  readonly #options: SerializeOptions;

  constructor(name: string, options: SerializeOptions = {}) {
    this.#name = name;
    this.#options = options;
  }

  parse(cookie: null | string, options?: ParseOptions) {
    if (cookie === null) {
      return Promise.resolve(null);
    }

    const cookies = parse(cookie, { ...this.#options, ...options });

    if (this.#name in cookies) {
      const value = cookies[this.#name];

      if (value === '') {
        return Promise.resolve('');
      }

      return Promise.resolve(JSON.parse(expectToBeDefined(value)) as unknown);
    }

    return Promise.resolve(null);
  }

  serialize(value: unknown, options?: SerializeOptions) {
    return Promise.resolve(
      serialize(this.#name, value === '' ? '' : JSON.stringify(value), { ...this.#options, ...options }),
    );
  }
}

class ClientCookieSessionStorage<T, F = T> implements SessionStorage<T, F> {
  readonly #cookie: Cookie;

  constructor(options: SerializeOptions) {
    this.#cookie = new ClientCookie('__session', options);
  }

  async commitSession(session: Session<T, F>, options?: SerializeOptions) {
    return await this.#cookie.serialize(session.data, options);
  }

  async destroySession(session: Session<T, F>, options?: SerializeOptions) {
    return await this.#cookie.serialize('', { ...options, expires: new Date(0), maxAge: undefined });
  }

  async getSession(cookie?: null | string, options?: ParseOptions) {
    if (cookie === null || cookie === undefined || cookie === '') {
      return new ClientSession<T, F>({});
    }

    const data = ((await this.#cookie.parse(cookie, options)) ?? {}) as Partial<T>;

    return new ClientSession<T, F>(data);
  }
}

class ClientSession<T, F = T> implements Session<T, F> {
  readonly id = '';

  get data() {
    return Object.fromEntries(this.#storage) as FlashSessionData<T, F>;
  }

  readonly #storage: Map<FlashDataKey<keyof F & string> | keyof T, unknown>;

  constructor(data: Partial<T>) {
    this.#storage = new Map(Object.entries(data)) as Map<FlashDataKey<keyof F & string> | keyof T, unknown>;
  }

  flash<K extends keyof F & string>(name: K, value: F[K]) {
    this.#storage.set(toFlashName(name), value);
  }

  get<K extends (keyof F | keyof T) & string>(name: K) {
    if (this.#storage.has(name as keyof T)) {
      return this.#storage.get(name as keyof T) as SessionDataValue<K, T, F>;
    }

    const flashName = toFlashName(name as keyof F & string);

    if (this.#storage.has(flashName)) {
      const value = this.#storage.get(flashName);

      this.#storage.delete(flashName);

      return value as SessionDataValue<K, T, F>;
    }

    return undefined;
  }

  has(name: (keyof F | keyof T) & string) {
    return this.#storage.has(name as keyof T) || this.#storage.has(toFlashName(name as keyof F & string));
  }

  set<K extends keyof T & string>(name: K, value: T[K]) {
    this.#storage.set(name, value);
  }

  unset(name: keyof T & string) {
    this.#storage.delete(name);
  }
}

export function commitSession(session: Session<SessionData>) {
  return getSessionStorage().commitSession(session);
}

export function getSession(cookie: string) {
  return getSessionStorage().getSession(cookie);
}

function getSessionStorage() {
  return new ClientCookieSessionStorage<SessionData>({
    path: import.meta.env.BASE_URL,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  });
}

function toFlashName<K extends string>(name: K): FlashDataKey<K> {
  return `__flash_${name}__`;
}
