import type { FormEvent } from 'react';

import { FormattedMessage } from 'react-intl';
import { Form, redirect, useSubmit } from 'react-router';

import { Button } from '~/components/ui/button';
import { Menu } from '~/components/ui/menu';
import { MenuGroup } from '~/components/ui/menu-group';
import { MenuItem } from '~/components/ui/menu-item';
import { SettingsMenu } from '~/components/ui/settings-menu';
import { SettingsMenuGroup } from '~/components/ui/settings-menu-group';
import { SettingsMenuRadioItem } from '~/components/ui/settings-menu-radio-item';
import { APPEARANCES, isAppearance } from '~/services/appearance';
import { getAppearance, setAppearance } from '~/services/appearance.client';
import { isLocale, LOCALES } from '~/services/intl';
import { getLocale, setLocale } from '~/services/intl.client';
import { commitSession, getSession } from '~/services/session.client';
import { expectToSatisfy } from '~/shared/expect';

import type { Route } from './+types/route';

import { MESSAGE_ID_BY_APPEARANCE, MESSAGE_RAW_BY_LOCALE } from './constants';

export async function clientAction({ request }: Route.ClientActionArgs) {
  const [session, formData] = await Promise.all([getSession(document.cookie), request.formData()]);

  setAppearance(session, expectToSatisfy(formData.get('appearance'), isAppearance));
  setLocale(session, expectToSatisfy(formData.get('locale'), isLocale));

  document.cookie = await commitSession(session);

  return redirect(request.url);
}

export async function clientLoader() {
  const session = await getSession(document.cookie);
  const appearance = getAppearance(session);
  const locale = getLocale(session);

  return { appearance, locale };
}

export default function Route({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();

  function handleChange(event: FormEvent<HTMLFormElement>) {
    void submit(event.currentTarget, { method: 'post', replace: true });
  }

  return (
    <Menu asChild>
      <Form method='post' onChange={handleChange}>
        <SettingsMenu>
          <SettingsMenuGroup legend={<FormattedMessage id='menuSettingsLanguageLegend' />}>
            {LOCALES.map((locale) => (
              <SettingsMenuRadioItem
                defaultChecked={locale === loaderData.locale}
                key={locale}
                name='locale'
                value={locale}
              >
                {MESSAGE_RAW_BY_LOCALE[locale]}
              </SettingsMenuRadioItem>
            ))}
          </SettingsMenuGroup>
          <SettingsMenuGroup legend={<FormattedMessage id='menuSettingsAppearanceLegend' />}>
            {APPEARANCES.map((appearance) => (
              <SettingsMenuRadioItem
                defaultChecked={appearance === loaderData.appearance}
                key={appearance}
                name='appearance'
                value={appearance}
              >
                <FormattedMessage id={MESSAGE_ID_BY_APPEARANCE[appearance]} />
              </SettingsMenuRadioItem>
            ))}
          </SettingsMenuGroup>
        </SettingsMenu>
        <MenuGroup scripting='none'>
          <MenuItem>
            <Button variant='primary'>
              <FormattedMessage id='menuSettingsSaveButton' />
            </Button>
          </MenuItem>
        </MenuGroup>
      </Form>
    </Menu>
  );
}
