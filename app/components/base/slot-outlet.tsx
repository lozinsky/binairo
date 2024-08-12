import { createContext, type ReactNode, useContext } from 'react';

export const SlotOutletContext = createContext<ReactNode>(null);

export function SlotOutlet() {
  return useContext(SlotOutletContext);
}
