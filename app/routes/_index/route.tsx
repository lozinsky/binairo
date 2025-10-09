import { FormattedMessage } from 'react-intl';
import { href } from 'react-router';

import { BrandLogo } from '~/components/ui/brand-logo';
import { ButtonLink } from '~/components/ui/button-link';
import { Menu } from '~/components/ui/menu';
import { MenuGroup } from '~/components/ui/menu-group';
import { MenuItem } from '~/components/ui/menu-item';
import { serializeBoard } from '~/lib/board-serializer';
import { getGame } from '~/services/game.client';
import { getSession } from '~/services/session.client';

import type { Route } from './+types/route';

export async function clientLoader() {
  const session = await getSession(document.cookie);
  const game = getGame(session);

  return {
    board: game === null ? null : serializeBoard(game.board),
  };
}

export default function Route({ loaderData }: Route.ComponentProps) {
  return (
    <Menu>
      <BrandLogo />
      <MenuGroup>
        {loaderData.board !== null && (
          <MenuItem>
            <ButtonLink prefetch='render' to={href('/game/:board', { board: loaderData.board })} variant='primary'>
              <FormattedMessage id='menuGameContinueLink' />
            </ButtonLink>
          </MenuItem>
        )}
        <MenuItem>
          <ButtonLink
            prefetch='render'
            to={href('/game')}
            variant={loaderData.board === null ? 'primary' : 'secondary'}
          >
            <FormattedMessage id='menuGameLink' />
          </ButtonLink>
        </MenuItem>
        <MenuItem>
          <ButtonLink to={href('/game/tutorial/:step?/:action?')} variant='secondary'>
            <FormattedMessage id='menuGameTutorialLink' />
          </ButtonLink>
        </MenuItem>
      </MenuGroup>
    </Menu>
  );
}
