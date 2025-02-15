import type { ReactNode } from 'react';

import { Slot } from '~/components/base/slot';

export type ScriptingValue = 'enabled' | 'none';

export function Scripting({ children, value }: { children: ReactNode; value?: ScriptingValue }) {
  if (value === undefined) {
    return children;
  }

  return (
    <Slot
      className='scripting-enabled:data-[scripting=none]:hidden scripting-none:data-[scripting=enabled]:hidden'
      data-scripting={value}
    >
      {children}
    </Slot>
  );
}
