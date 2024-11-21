import type { ReactNode } from 'react';

export function MenuItem({ children }: { children: ReactNode }) {
  return <li className='flex'>{children}</li>;
}
