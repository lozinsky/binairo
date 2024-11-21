import type { CSSProperties, ReactNode } from 'react';

import { AnimationSync } from '~/components/base/animation-sync';

export function GameBoard({ children, size }: { children: ReactNode; size: number }) {
  return (
    <AnimationSync>
      <div
        className='my-auto grid aspect-square w-full grid-cols-[repeat(var(--size),1fr)] grid-rows-[repeat(var(--size),1fr)] gap-[calc(10%/var(--size))]'
        style={{ '--size': size } as CSSProperties}
      >
        {children}
      </div>
    </AnimationSync>
  );
}
