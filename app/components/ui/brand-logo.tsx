import type { BoardCellState } from '~/lib/board';

import { GameBoard } from '~/components/ui/game-board';
import { GameBoardCell } from '~/components/ui/game-board-cell';
import { useRandom } from '~/hooks/use-random';
import { shuffle } from '~/shared/random';

export function BrandLogo() {
  const random = useRandom();
  const states = shuffle<BoardCellState>(['R', 'B', 'B', 'E'], random);

  return (
    <div className='mx-auto flex w-2/3 justify-center'>
      <GameBoard size={states.length / 2}>
        {states.map((state, index) => (
          <GameBoardCell key={index} state={state} />
        ))}
      </GameBoard>
    </div>
  );
}
