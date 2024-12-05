import type { ComponentProps } from 'react';

import { Link } from 'react-router';

import { usePushedReferrerResolvedPath } from '~/hooks/use-pushed-referrer-resolved-path';
import { useReplacedReferrerResolvedPath } from '~/hooks/use-replaced-referrer-resolved-path';

export type HistoryLinkPrefetch = 'intent' | 'none' | 'render' | 'viewport';

export function HistoryLink({ replace, ...props }: ComponentProps<typeof Link>) {
  return replace ? <HistoryReplaceLink {...props} /> : <HistoryPushLink {...props} />;
}

function HistoryPushLink({ relative, to, ...props }: ComponentProps<typeof Link>) {
  const pushedReferrerResolvedPath = usePushedReferrerResolvedPath(to, { relative });

  return <Link {...props} to={pushedReferrerResolvedPath} />;
}

function HistoryReplaceLink({ relative, to, ...props }: ComponentProps<typeof Link>) {
  const replacedReferrerResolvedPath = useReplacedReferrerResolvedPath(to, { relative });

  return <Link {...props} replace to={replacedReferrerResolvedPath} />;
}
