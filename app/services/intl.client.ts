/* eslint-disable @typescript-eslint/no-namespace */

import type { Session } from 'react-router';

import { createIntl, createIntlCache, type IntlShape } from '@formatjs/intl';
import * as LocaleMatcher from '@formatjs/intl-localematcher';

import type { Locale } from '~/services/intl';
import type { SessionData } from '~/services/session';

import { DEFAULT_LOCALE, LOCALES, type Messages } from '~/services/intl';
import { expectToBeDefined } from '~/shared/expect';

declare global {
  namespace FormatjsIntl {
    interface IntlConfig {
      locale: Locale;
    }

    interface Message {
      ids: keyof Messages;
    }
  }
}

const intlCache = createIntlCache();
const intlLoaderByLocale: Readonly<Record<Locale, () => Promise<IntlShape>>> = {
  en: () =>
    import('~/messages/en.json').then((module) => createIntl({ locale: 'en', messages: module.default }, intlCache)),
  ru: () =>
    import('~/messages/ru.json').then((module) => createIntl({ locale: 'ru', messages: module.default }, intlCache)),
};
const intlByLocale: Partial<Record<Locale, IntlShape>> = {};

export async function getIntl(session: Session<SessionData>) {
  const locale = getLocale(session);

  if (!(locale in intlByLocale)) {
    intlByLocale[locale] = await intlLoaderByLocale[locale]();
  }

  return expectToBeDefined(intlByLocale[locale]);
}

export function getLocale(session: Session<SessionData>) {
  const locales = getLocalesFromSession(session) ?? getLocalesFromNavigator();

  return LocaleMatcher.match(locales, LOCALES, DEFAULT_LOCALE) as Locale;
}

export function setLocale(session: Session<SessionData>, locale: Locale) {
  session.set('locale', locale);
}

function getLocalesFromNavigator() {
  return navigator.languages;
}

function getLocalesFromSession(session: Session<SessionData>) {
  const locale = session.get('locale');

  if (typeof locale === 'string') {
    return [locale];
  }

  return;
}
