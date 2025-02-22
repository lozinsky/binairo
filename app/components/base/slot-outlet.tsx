import { createContext, type ReactNode, use } from 'react';

export const SlotOutletContext = createContext<ReactNode>(null);

export function SlotOutlet() {
  return use(SlotOutletContext);
}
