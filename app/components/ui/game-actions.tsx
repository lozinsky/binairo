import type { ReactNode } from 'react';

export function GameActions({ children }: { children: ReactNode }) {
  return <div className='my-auto flex justify-center'>{children}</div>;
}
