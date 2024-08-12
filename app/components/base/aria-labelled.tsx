import { createContext, type ReactNode, useId } from 'react';

export const AriaLabelledByContext = createContext<string | undefined>(undefined);

export function AriaLabelled({ children }: { children: ReactNode }) {
  const id = useId();

  return <AriaLabelledByContext.Provider value={id}>{children}</AriaLabelledByContext.Provider>;
}
