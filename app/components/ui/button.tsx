import { Loader2 } from 'lucide-react';
import { type ReactNode, useContext } from 'react';

import { AriaLabelledByContext } from '~/components/base/aria-labelled';
import { Slot } from '~/components/base/slot';
import { SlotOutlet } from '~/components/base/slot-outlet';
import { SlotRoot } from '~/components/base/slot-root';

export type ButtonSize = 'default' | 'icon';

export type ButtonVariant = 'ghost' | 'primary' | 'secondary';

export function Button({
  asChild,
  children,
  loading,
  size = 'default',
  variant,
}: {
  asChild?: boolean;
  children: ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  variant: ButtonVariant;
}) {
  const Component = asChild ? Slot : 'button';
  const ariaLabelledBy = useContext(AriaLabelledByContext);

  return (
    <Component
      aria-labelledby={ariaLabelledBy}
      className='flex items-center justify-center rounded-lg transition-colors data-[size=icon]:size-9 data-[size=default]:flex-grow data-[variant=primary]:bg-primary data-[variant=secondary]:bg-secondary data-[size=default]:py-3 data-[variant=primary]:text-primary-content data-[variant=secondary]:text-secondary-content data-[variant=ghost]:hover:bg-primary/10 hover:data-[variant=primary]:bg-primary/90 hover:data-[variant=secondary]:bg-secondary/90'
      data-size={size}
      data-variant={variant}
    >
      <SlotRoot target={children}>
        {loading ? <Loader2 aria-hidden className='animate-spin' /> : <SlotOutlet />}
      </SlotRoot>
    </Component>
  );
}
