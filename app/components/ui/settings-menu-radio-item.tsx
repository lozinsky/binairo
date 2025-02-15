import type { ReactNode } from 'react';

import { Check } from 'lucide-react';

export function SettingsMenuRadioItem({
  children,
  defaultChecked,
  name,
  value,
}: {
  children: ReactNode;
  defaultChecked: boolean;
  name: string;
  value: string;
}) {
  return (
    <li className='flex'>
      <label className='flex grow items-center p-4'>
        {children}
        <input className='peer sr-only' defaultChecked={defaultChecked} name={name} type='radio' value={value} />
        <Check className='invisible ml-auto size-5 peer-checked:visible' />
      </label>
    </li>
  );
}
