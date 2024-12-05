import { redirect } from 'react-router';

import { generateBoard } from '~/services/game-worker.client';
import { expectNotToBeNaN } from '~/shared/expect';

import type { Route } from './+types/route';

export async function clientLoader({ params, request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const board = await generateBoard(expectNotToBeNaN(Number(params.size)));

  url.pathname = `${import.meta.env.BASE_URL}game/${board.toString()}`;

  return redirect(url.toString());
}
