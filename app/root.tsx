import '~/globals';

import type { ReactNode } from 'react';

import { IntlProvider } from 'react-intl';
import {
  href,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs,
  useRouteLoaderData,
} from 'react-router';

import { RootLayout } from '~/components/ui/root-layout';
import { RootLayoutContent } from '~/components/ui/root-layout-content';
import { RootLayoutHeader } from '~/components/ui/root-layout-header';
import { RandomStateContext } from '~/hooks/use-random';
import { DEFAULT_APPEARANCE } from '~/services/appearance';
import { getAppearance } from '~/services/appearance.client';
import { DEFAULT_LOCALE, type Messages } from '~/services/intl';
import { getIntl } from '~/services/intl.client';
import { getSession } from '~/services/session.client';
import { Random } from '~/shared/random';
import { resolvePathname } from '~/shared/url';

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
    random: { state: random.state },
  };
}

export function HydrateFallback() {
  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  const loaderData = useRouteLoaderData<typeof clientLoader>('root') ?? {
    appearance: DEFAULT_APPEARANCE,
    intl: { locale: DEFAULT_LOCALE, messages: {} },
  };

  return (
    <html data-appearance={loaderData.appearance} lang={loaderData.intl.locale}>
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
    { href: resolvePathname('/manifest.webmanifest'), rel: 'manifest' },
    { href: resolvePathname('/favicon.ico'), rel: 'icon', sizes: '64x64' },
    { href: resolvePathname('/favicon.svg'), rel: 'icon', type: 'image/svg+xml' },
    { href: resolvePathname('/apple-touch-icon.png'), rel: 'apple-touch-icon' },
  ];
}

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  if (data == null) {
    return [];
  }

  return [{ title: data.meta.title }, { content: data.meta.description, name: 'description' }];
}

export default function Root({ loaderData }: Route.ComponentProps) {
  return (
    <IntlProvider locale={loaderData.intl.locale} messages={loaderData.intl.messages}>
      <RandomStateContext value={loaderData.random.state}>
        <RootLayout>
          <RootLayoutHeader />
          <RootLayoutContent>
            <Outlet />
          </RootLayoutContent>
        </RootLayout>
      </RandomStateContext>
    </IntlProvider>
  );
}

export function shouldRevalidate({ defaultShouldRevalidate, formAction }: ShouldRevalidateFunctionArgs) {
  if (formAction?.startsWith(resolvePathname(href('/settings')))) {
    return defaultShouldRevalidate;
  }

  return false;
}
