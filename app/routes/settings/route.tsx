import { type ClientActionFunctionArgs, Form, redirect, useLoaderData, useSubmit } from '@remix-run/react';
import { type FormEvent } from 'react';
import { FormattedMessage } from 'react-intl';

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

import { MESSAGE_ID_BY_APPEARANCE, MESSAGE_RAW_BY_LOCALE } from './constants';

export async function clientLoader() {
  const session = await getSession(document.cookie);
  const appearance = getAppearance(session);
  const locale = getLocale(session);

  return { appearance, locale };
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const [session, formData] = await Promise.all([getSession(document.cookie), request.formData()]);

  setAppearance(session, expectToSatisfy(formData.get('appearance'), isAppearance));
  setLocale(session, expectToSatisfy(formData.get('locale'), isLocale));

  document.cookie = await commitSession(session);

  return redirect(request.url);
}

export default function Route() {
  const { appearance: selectedAppearance, locale: selectedLocale } = useLoaderData<typeof clientAction>();
  const submit = useSubmit();

  function handleChange(event: FormEvent<HTMLFormElement>) {
    submit(event.currentTarget, { method: 'post', replace: true });
  }

  return (
    <Menu asChild>
      <Form method='post' onChange={handleChange}>
        <SettingsMenu>
          <SettingsMenuGroup legend={<FormattedMessage id='menuSettingsLanguageLegend' />}>
            {LOCALES.map((locale) => (
              <SettingsMenuRadioItem
                defaultChecked={locale === selectedLocale}
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
                defaultChecked={appearance === selectedAppearance}
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
