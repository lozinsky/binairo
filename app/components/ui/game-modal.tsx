import type { ReactNode } from 'react';

export function GameModal({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='fixed inset-0 backdrop-blur-xs' />
      <dialog
        className='bg-base-200 text-base-content absolute inset-0 m-auto flex w-4/5 flex-col gap-y-9 rounded-3xl px-9 pt-12 pb-9 drop-shadow-lg'
        open
      >
        {children}
      </dialog>
    </>
  );
}
