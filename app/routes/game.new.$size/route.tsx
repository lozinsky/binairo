import { type ClientLoaderFunctionArgs, redirect } from '@remix-run/react';

import { generateBoard } from '~/services/game-worker.client';
import { expectNotToBeNaN } from '~/shared/expect';

export async function clientLoader({ params, request }: ClientLoaderFunctionArgs) {
  const url = new URL(request.url);
  const board = await generateBoard(expectNotToBeNaN(Number(params.size)));

  url.pathname = `${import.meta.env.BASE_URL}game/${board.toString()}`;

  return redirect(url.toString());
}
