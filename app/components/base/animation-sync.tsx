import type { ElementRef, ReactNode } from 'react';

import { Slot } from '~/components/base/slot';
import { expectToBeDefined } from '~/shared/expect';

export function AnimationSync({ children }: { children: ReactNode }) {
  function setSlot(slot: ElementRef<typeof Slot> | null) {
    if (slot === null) {
      return;
    }

    const animations = slot.getAnimations({ subtree: true }).filter(isCSSAnimation);
    const currentTimeByAnimationName: Partial<Record<string, number>> = {};

    for (const animation of animations) {
      if (typeof animation.currentTime !== 'number') {
        continue;
      }

      currentTimeByAnimationName[animation.animationName] = Math.max(
        currentTimeByAnimationName[animation.animationName] ?? 0,
        animation.currentTime,
      );
    }

    for (const animation of animations) {
      animation.currentTime = expectToBeDefined(currentTimeByAnimationName[animation.animationName]);
    }
  }

  return <Slot ref={setSlot}>{children}</Slot>;
}

function isCSSAnimation(animation: Animation): animation is CSSAnimation {
  return animation instanceof CSSAnimation;
}
