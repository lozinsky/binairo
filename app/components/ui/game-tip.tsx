import type { ReactNode } from 'react';

export function GameTip({ children }: { children: ReactNode }) {
  return <div className='my-auto flex justify-center text-center text-xl text-balance'>{children}</div>;
}
