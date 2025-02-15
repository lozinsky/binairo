import type { ReactNode } from 'react';

export function SettingsMenuGroup({ children, legend }: { children: ReactNode; legend: ReactNode }) {
  return (
    <div className='flex flex-col gap-y-1'>
      <span className='text-sm'>{legend}</span>
      <ul className='divide-base-300 bg-base-200 flex flex-col divide-y rounded-lg'>{children}</ul>
    </div>
  );
}
