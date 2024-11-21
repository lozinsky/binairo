import type { ReactNode } from 'react';

export function GameModal({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='fixed inset-0 backdrop-blur-sm' />
      <dialog
        className='absolute inset-0 flex w-4/5 flex-col gap-y-9 rounded-3xl bg-base-200 px-9 pb-9 pt-12 text-base-content drop-shadow-lg'
        open
      >
        {children}
      </dialog>
    </>
  );
}
