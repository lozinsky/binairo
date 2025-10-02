import { Loader2 } from 'lucide-react';
import { type ReactNode, use } from 'react';

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
  const ariaLabelledBy = use(AriaLabelledByContext);

  return (
    <Component
      aria-labelledby={ariaLabelledBy}
      className='flex items-center justify-center rounded-lg transition-colors data-[size=default]:grow data-[size=default]:py-3 data-[size=icon]:size-9 data-[variant=ghost]:hover:bg-primary/10 data-[variant=primary]:bg-primary data-[variant=primary]:text-primary-content hover:data-[variant=primary]:bg-primary/90 data-[variant=secondary]:bg-secondary data-[variant=secondary]:text-secondary-content hover:data-[variant=secondary]:bg-secondary/90'
      data-size={size}
      data-variant={variant}
    >
      <SlotRoot target={children}>
        {loading ? <Loader2 aria-hidden className='animate-spin' /> : <SlotOutlet />}
      </SlotRoot>
    </Component>
  );
}
