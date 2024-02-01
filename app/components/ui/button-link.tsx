import { Link, type Path, useNavigation, useResolvedPath } from '@remix-run/react';
import { type ReactNode } from 'react';

import { HistoryLink, type HistoryLinkPrefetch } from '~/components/base/history-link';
import { Button, type ButtonSize, type ButtonVariant } from '~/components/ui/button';

export type ButtonLinkVariant = ButtonVariant;

export type ButtonLinkSize = ButtonSize;

export type ButtonLinkPrefetch = HistoryLinkPrefetch;

export function ButtonLink({
  children,
  history = true,
  prefetch,
  replace,
  size,
  to,
  variant,
}: {
  children: ReactNode;
  history?: boolean;
  prefetch?: ButtonLinkPrefetch;
  replace?: boolean;
  size?: ButtonLinkSize;
  to: Partial<Path> | string;
  variant: ButtonLinkVariant;
}) {
  const navigation = useNavigation();
  const path = useResolvedPath(to);
  const Component = history ? HistoryLink : Link;

  return (
    <Button
      asChild
      loading={navigation.state === 'loading' && navigation.location.pathname === path.pathname}
      size={size}
      variant={variant}
    >
      <Component prefetch={prefetch} replace={replace} to={path}>
        {children}
      </Component>
    </Button>
  );
}
