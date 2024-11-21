import type { ReactNode } from 'react';

export function GameModalFooter({ children }: { children: ReactNode }) {
  return <footer className='flex flex-col gap-y-3'>{children}</footer>;
}
