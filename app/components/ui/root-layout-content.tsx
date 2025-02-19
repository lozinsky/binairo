import type { ReactNode } from 'react';

export function RootLayoutContent({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
