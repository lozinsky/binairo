import type { ReactNode } from 'react';

export function GameModalHeader({ children }: { children: ReactNode }) {
  return <header className='text-center text-xl font-semibold'>{children}</header>;
}
