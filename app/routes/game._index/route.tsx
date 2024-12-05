import { ButtonLink } from '~/components/ui/button-link';
import { Menu } from '~/components/ui/menu';
import { MenuGroup } from '~/components/ui/menu-group';
import { MenuItem } from '~/components/ui/menu-item';

import type { Route } from './+types/route';

export function clientLoader() {
  return { sizes: [4, 6, 8, 10, 12] };
}

export default function Route({ loaderData }: Route.ComponentProps) {
  return (
    <Menu>
      <MenuGroup>
        {loaderData.sizes.map((size) => (
          <MenuItem key={size}>
            <ButtonLink prefetch='render' to={`/game/new/${size}`} variant='secondary'>
              {size}
            </ButtonLink>
          </MenuItem>
        ))}
      </MenuGroup>
    </Menu>
  );
}
