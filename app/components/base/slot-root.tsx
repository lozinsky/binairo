import type { ReactNode } from 'react';

import { SlotOutletContext } from '~/components/base/slot-outlet';

export function SlotRoot({ children, target }: { children: ReactNode; target: ReactNode }) {
  return <SlotOutletContext.Provider value={target}>{children}</SlotOutletContext.Provider>;
}
