import type en from '~/messages/en.json';

export type Locale = 'en' | 'ru';

export type Messages = Readonly<Record<keyof typeof en, string>>;

export const LOCALES: Locale[] = ['en', 'ru'];

export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return (LOCALES as unknown[]).includes(value);
}
