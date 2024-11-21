import type { ReactNode } from 'react';

import { Scripting, type ScriptingValue } from '~/components/base/scripting';

export type MenuGroupScripting = ScriptingValue;

export function MenuGroup({ children, scripting }: { children: ReactNode; scripting?: MenuGroupScripting }) {
  return (
    <Scripting value={scripting}>
      <ul className='flex flex-col gap-y-3'>{children}</ul>
    </Scripting>
  );
}
