import type en from '~/messages/en.json';

export enum Locale {
  En = 'en',
  Ru = 'ru',
}

export type Messages = Readonly<Record<keyof typeof en, string>>;

export const LOCALES = [Locale.En, Locale.Ru];

export const DEFAULT_LOCALE = Locale.En;

export function isLocale(value: unknown): value is Locale {
  return (LOCALES as unknown[]).includes(value);
}
