import type { ReactNode } from 'react';

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className='xs:max-w-xs relative mx-auto grid h-full grid-rows-[auto_1fr] px-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl'>
      {children}
    </div>
  );
}
