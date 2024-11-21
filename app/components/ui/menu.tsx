import type { ReactNode } from 'react';

import { Slot } from '~/components/base/slot';

export function Menu({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  const Component = asChild ? Slot : 'div';

  return <Component className='flex h-full flex-col justify-between gap-y-6'>{children}</Component>;
}
