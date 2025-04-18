import type { ReactNode } from 'react';

export function Game({ children }: { children: ReactNode }) {
  return (
    <div className='grid grid-rows-[minmax(--spacing(20),1fr)_auto_minmax(--spacing(20),1fr)] gap-y-6'>{children}</div>
  );
}
