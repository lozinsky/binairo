export type Appearance = 'auto' | 'dark' | 'light';

export const APPEARANCES: Appearance[] = ['auto', 'light', 'dark'];

export const DEFAULT_APPEARANCE: Appearance = 'auto';

export function isAppearance(value: unknown): value is Appearance {
  return (APPEARANCES as unknown[]).includes(value);
}
