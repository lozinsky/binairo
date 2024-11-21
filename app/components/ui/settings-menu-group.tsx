import type { ReactNode } from 'react';

export function SettingsMenuGroup({ children, legend }: { children: ReactNode; legend: ReactNode }) {
  return (
    <div className='flex flex-col gap-y-1'>
      <span className='text-sm'>{legend}</span>
      <ul className='flex flex-col divide-y divide-base-300 rounded-lg bg-base-200'>{children}</ul>
    </div>
  );
}
