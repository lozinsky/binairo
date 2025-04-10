import type { Messages } from '~/services/intl';

import { Board } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

export const BOARD = Board.create([
  ['E', 'R', 'E', 'E'],
  ['E', 'E', 'B', 'E'],
  ['E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'B'],
]);

export const DEFAULT_STEP: (typeof STEPS)[number] = {
  action: new MatrixSelection([]),
  highlight: new MatrixSelection([]),
  message: null,
};

export const STEPS: ReadonlyArray<{
  action: MatrixSelection;
  highlight: MatrixSelection;
  message: keyof Messages | null;
}> = [
  {
    action: new MatrixSelection([{ x: 0, y: 0 }]),
    highlight: new MatrixSelection([{ x: 0, y: 0 }]),
    message: 'gameTutorialMessage0',
  },
  {
    action: new MatrixSelection([
      { x: 0, y: 1 },
      { x: 0, y: 1 },
    ]),
    highlight: new MatrixSelection([{ x: 0, y: 1 }]),
    message: 'gameTutorialMessage1',
  },
  {
    action: new MatrixSelection([
      { x: 2, y: 0 },
      { x: 2, y: 0 },
    ]),
    highlight: new MatrixSelection([{ x: 2, y: 0 }]),
    message: 'gameTutorialMessage2',
  },
  {
    action: new MatrixSelection([{ x: 1, y: 1 }]),
    highlight: new MatrixSelection([{ x: 1, y: 1 }]),
    message: 'gameTutorialMessage3',
  },
  {
    action: new MatrixSelection([
      { x: 1, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ]),
    highlight: new MatrixSelection([
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ]),
    message: 'gameTutorialMessage4',
  },
  {
    action: new MatrixSelection([{ x: 3, y: 1 }]),
    highlight: new MatrixSelection([
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ]),
    message: 'gameTutorialMessage5',
  },
  {
    action: new MatrixSelection([
      { x: 1, y: 3 },
      { x: 1, y: 3 },
    ]),
    highlight: new MatrixSelection([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ]),
    message: 'gameTutorialMessage6',
  },
  {
    action: new MatrixSelection([{ x: 2, y: 3 }]),
    highlight: new MatrixSelection([{ x: 2, y: 3 }]),
    message: 'gameTutorialMessage7',
  },
  {
    action: new MatrixSelection([
      { x: 0, y: 2 },
      { x: 0, y: 2 },
      { x: 3, y: 2 },
      { x: 0, y: 3 },
    ]),
    highlight: new MatrixSelection([
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ]),
    message: 'gameTutorialMessage8',
  },
  {
    action: new MatrixSelection([
      { x: 3, y: 0 },
      { x: 3, y: 0 },
    ]),
    highlight: new MatrixSelection([{ x: 3, y: 0 }]),
    message: 'gameTutorialMessage9',
  },
];
