import type { Appearance } from '~/services/appearance';
import type { Locale } from '~/services/intl';
import type { Messages } from '~/services/intl';

export const MESSAGE_RAW_BY_LOCALE: Readonly<Record<Locale, string>> = {
  en: 'English',
  ru: 'Русский',
};

export const MESSAGE_ID_BY_APPEARANCE: Readonly<Record<Appearance, keyof Messages>> = {
  auto: 'menuSettingsAppearanceAutoLabel',
  dark: 'menuSettingsAppearanceDarkLabel',
  light: 'menuSettingsAppearanceLightLabel',
};
