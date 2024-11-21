import type { ReactNode } from 'react';

export function GameTip({ children }: { children: ReactNode }) {
  return <div className='my-auto flex justify-center text-balance text-center text-xl'>{children}</div>;
}
