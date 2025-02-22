import { href, redirect } from 'react-router';

import { generateBoard } from '~/services/game-worker.client';
import { expectNotToBeNaN } from '~/shared/expect';

import type { Route } from './+types/route';

export async function clientLoader({ params, request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const board = await generateBoard(expectNotToBeNaN(Number(params.size)));

  url.pathname = href('/game/:board', { board: board.toString() }).replace(/^\//, import.meta.env.BASE_URL);

  return redirect(url.toString());
}
