/* eslint-disable @typescript-eslint/no-namespace */

import { type IntlShape, createIntl, createIntlCache } from '@formatjs/intl';
import * as LocaleMatcher from '@formatjs/intl-localematcher';
import { type Session } from '@remix-run/node';

import { DEFAULT_LOCALE, LOCALES, Locale, type Messages } from '~/services/intl';
import { type SessionData } from '~/services/session';
import { expectToBeDefined } from '~/shared/expect';

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof Messages;
    }

    interface IntlConfig {
      locale: Locale;
    }
  }
}

const intlCache = createIntlCache();
const intlLoaderByLocale: Readonly<Record<Locale, () => Promise<IntlShape>>> = {
  [Locale.En]: () =>
    import('~/messages/en.json').then((module) =>
      createIntl({ locale: Locale.En, messages: module.default }, intlCache),
    ),
  [Locale.Ru]: () =>
    import('~/messages/ru.json').then((module) =>
      createIntl({ locale: Locale.Ru, messages: module.default }, intlCache),
    ),
};
const intlByLocale: Partial<Record<Locale, IntlShape>> = {};

function getLocalesFromSession(session: Session<SessionData>) {
  const locale = session.get('locale');

  if (typeof locale === 'string') {
    return [locale];
  }
}

function getLocalesFromNavigator() {
  return navigator.languages;
}

export function getLocale(session: Session<SessionData>) {
  const locales = getLocalesFromSession(session) ?? getLocalesFromNavigator();

  return LocaleMatcher.match(locales, LOCALES, DEFAULT_LOCALE) as Locale;
}

export function setLocale(session: Session<SessionData>, locale: Locale) {
  session.set('locale', locale);
}

export async function getIntl(session: Session<SessionData>) {
  const locale = getLocale(session);

  if (!(locale in intlByLocale)) {
    intlByLocale[locale] = await intlLoaderByLocale[locale]();
  }

  return expectToBeDefined(intlByLocale[locale]);
}
