import { type ReactNode, use } from 'react';

import { AriaLabelledByContext } from '~/components/base/aria-labelled';
import { expectToBeDefined } from '~/shared/expect';

export function AriaLabel({ children }: { children: ReactNode }) {
  const ariaLabelledBy = expectToBeDefined(use(AriaLabelledByContext));

  return (
    <span className='hidden' id={ariaLabelledBy}>
      {children}
    </span>
  );
}
