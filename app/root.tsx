import type { ReactNode } from 'react';

import { IntlProvider } from 'react-intl';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs,
  useRouteLoaderData,
} from 'react-router';

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

import type { Route } from './+types/root';

import './root.css';

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

export function HydrateFallback() {
  return null;
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
      <body className='bg-base-100 text-base-content h-svh pb-14'>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function links(): Route.LinkDescriptors {
  return [
    { href: `${import.meta.env.BASE_URL}manifest.webmanifest`, rel: 'manifest' },
    { href: `${import.meta.env.BASE_URL}favicon.ico`, rel: 'icon', sizes: '64x64' },
    { href: `${import.meta.env.BASE_URL}favicon.svg`, rel: 'icon', type: 'image/svg+xml' },
    { href: `${import.meta.env.BASE_URL}apple-touch-icon.png`, rel: 'apple-touch-icon' },
  ];
}

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (data === undefined) {
    return [];
  }

  return [{ title: data.meta.title }, { content: data.meta.description, name: 'description' }];
}

export default function Root({ loaderData }: Route.ComponentProps) {
  return (
    <IntlProvider locale={loaderData.intl.locale} messages={loaderData.intl.messages}>
      <RandomSeedContext.Provider value={loaderData.random.seed}>
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

export function shouldRevalidate({ defaultShouldRevalidate, formAction }: ShouldRevalidateFunctionArgs) {
  if (formAction?.startsWith(`${import.meta.env.BASE_URL}settings`)) {
    return defaultShouldRevalidate;
  }

  return false;
}
