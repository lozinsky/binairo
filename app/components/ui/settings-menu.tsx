import type { ReactNode } from 'react';

export function SettingsMenu({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-y-6'>{children}</div>;
}
