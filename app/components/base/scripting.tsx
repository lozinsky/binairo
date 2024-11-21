import type { ReactNode } from 'react';

import { Slot } from '~/components/base/slot';

export type ScriptingValue = 'enabled' | 'none';

export function Scripting({ children, value }: { children: ReactNode; value?: ScriptingValue }) {
  if (value === undefined) {
    return children;
  }

  return (
    <Slot
      className='data-[scripting=none]:scripting-enabled:hidden data-[scripting=enabled]:scripting-none:hidden'
      data-scripting={value}
    >
      {children}
    </Slot>
  );
}
