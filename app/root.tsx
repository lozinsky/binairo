import { type LinkDescriptor, type SerializeFrom } from '@remix-run/node';
import {
  Links,
  Meta,
  type MetaDescriptor,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs,
  useLoaderData,
  useRouteLoaderData,
} from '@remix-run/react';
import { type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import '~/globals';

import { RootLayout } from '~/components/ui/root-layout';
import { RootLayoutContent } from '~/components/ui/root-layout-content';
import { RootLayoutHeader } from '~/components/ui/root-layout-header';
import { RandomSeedContext } from '~/hooks/use-random';
import { DEFAULT_APPEARANCE } from '~/services/appearance';
import { getAppearance } from '~/services/appearance.client';
import { DEFAULT_LOCALE, type Messages } from '~/services/intl';
import { getIntl } from '~/services/intl.client';
import { getSession } from '~/services/session.client';
import { Random } from '~/shared/random';

import root from './root.css?url';

export function shouldRevalidate({ defaultShouldRevalidate, formAction }: ShouldRevalidateFunctionArgs) {
  if (formAction?.startsWith(`${import.meta.env.BASE_URL}settings`)) {
    return defaultShouldRevalidate;
  }

  return false;
}

export async function clientLoader() {
  const session = await getSession(document.cookie);
  const appearance = getAppearance(session);
  const intl = await getIntl(session);
  const title = intl.formatMessage({ id: 'metaTitle' });
  const description = intl.formatMessage({ id: 'metaDescription' });
  const random = Random.create();

  return {
    appearance,
    intl: { locale: intl.locale, messages: intl.messages as Messages },
    meta: { description, title },
    random: { seed: random.seed },
  };
}

export function meta({ data }: { data?: SerializeFrom<typeof clientLoader> }): MetaDescriptor[] {
  if (data === undefined) {
    return [];
  }

  return [{ title: data.meta.title }, { content: data.meta.description, name: 'description' }];
}

export function links(): LinkDescriptor[] {
  return [
    { href: `${import.meta.env.BASE_URL}manifest.webmanifest`, rel: 'manifest' },
    { href: `${import.meta.env.BASE_URL}favicon.ico`, rel: 'icon', sizes: '64x64' },
    { href: `${import.meta.env.BASE_URL}favicon.svg`, rel: 'icon', type: 'image/svg+xml' },
    { href: `${import.meta.env.BASE_URL}apple-touch-icon.png`, rel: 'apple-touch-icon' },
    { href: root, rel: 'stylesheet' },
  ];
}

export function Layout({ children }: { children: ReactNode }) {
  const { appearance, intl } = useRouteLoaderData<typeof clientLoader>('root') ?? {
    appearance: DEFAULT_APPEARANCE,
    intl: { locale: DEFAULT_LOCALE, messages: {} },
  };

  return (
    <html data-appearance={appearance} lang={intl.locale}>
      <head>
        <meta charSet='utf-8' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <Meta />
        <Links />
      </head>
      <body className='h-dvh bg-base-100 text-base-content'>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return null;
}

export default function Root() {
  const { intl, random } = useLoaderData<typeof clientLoader>();

  return (
    <IntlProvider locale={intl.locale} messages={intl.messages}>
      <RandomSeedContext.Provider value={random.seed}>
        <RootLayout>
          <RootLayoutHeader />
          <RootLayoutContent>
            <Outlet />
          </RootLayoutContent>
        </RootLayout>
      </RandomSeedContext.Provider>
    </IntlProvider>
  );
}
