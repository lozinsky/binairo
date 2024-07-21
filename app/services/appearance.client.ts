import { type Session } from '@remix-run/node';

import { type Appearance, DEFAULT_APPEARANCE, isAppearance } from '~/services/appearance';
import { type SessionData } from '~/services/session';

export function getAppearance(session: Session<SessionData>) {
  const appearance = session.get('appearance');

  return isAppearance(appearance) ? appearance : DEFAULT_APPEARANCE;
}

export function setAppearance(session: Session<SessionData>, appearance: Appearance) {
  session.set('appearance', appearance);
}
