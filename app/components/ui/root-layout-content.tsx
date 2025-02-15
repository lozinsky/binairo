import type { ReactNode } from 'react';

export function RootLayoutContent({ children }: { children: ReactNode }) {
  return <main className='pt-4 pb-14'>{children}</main>;
}
