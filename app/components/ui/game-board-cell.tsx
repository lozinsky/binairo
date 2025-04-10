import { type ReactNode, type SVGProps, use } from 'react';

import type { BoardCellState } from '~/lib/board';

import { AriaLabelledByContext } from '~/components/base/aria-labelled';
import { Slot } from '~/components/base/slot';
import { SlotOutlet } from '~/components/base/slot-outlet';
import { SlotRoot } from '~/components/base/slot-root';

const GAME_BOARD_CELL_DATA_STATE_BY_BOARD_CELL_STATE: Readonly<Record<BoardCellState, string>> = {
  B: 'b',
  E: 'e',
  R: 'r',
};

export function GameBoardCell({
  asChild,
  children,
  highlighted,
  locked,
  state,
}: {
  asChild?: boolean;
  children?: ReactNode;
  highlighted?: boolean;
  locked?: boolean;
  state: BoardCellState;
}) {
  const Component = asChild ? Slot : 'span';
  const ariaLabelledBy = use(AriaLabelledByContext);

  return (
    <Component
      aria-labelledby={ariaLabelledBy}
      className='group relative flex items-center justify-center outline-hidden'
      data-highlighted={highlighted}
      data-locked={locked}
      data-state={GAME_BOARD_CELL_DATA_STATE_BY_BOARD_CELL_STATE[state]}
    >
      <SlotRoot target={children}>
        <GameBoardCellRectangle className='group-data-[state=b]:text-cell-b-highlight group-data-[state=e]:text-cell-e-highlight group-data-[state=r]:text-cell-r-highlight group-focus-visible:group-data-[state=b]:text-cell-b-focus group-focus-visible:group-data-[state=e]:text-cell-e-focus group-focus-visible:group-data-[state=r]:text-cell-r-focus absolute inset-0 z-[-2] group-data-[highlighted=true]:animate-pulse' />
        <SlotOutlet />
        <GameBoardCellRectangle className='group-data-[state=b]:text-cell-b group-data-[state=e]:text-cell-e group-data-[state=r]:text-cell-r group-active:group-data-[locked=true]:animate-wiggle absolute inset-0 z-[-1] transition-all group-focus-visible:scale-75 group-data-[highlighted=true]:scale-75' />
      </SlotRoot>
    </Component>
  );
}

function GameBoardCellRectangle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill='currentColor' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M 200 0 c 94.2809 0 141.4214 0 170.7107 29.2893 a 100.0000 100.0000 0 0 1 0.0000 0.0000 c 29.2893 29.2893 29.2893 76.4298 29.2893 170.7107 L 400 200 c 0 94.2809 0 141.4214 -29.2893 170.7107 a 100.0000 100.0000 0 0 1 -0.0000 0.0000 c -29.2893 29.2893 -76.4298 29.2893 -170.7107 29.2893 L 200 400 c -94.2809 0 -141.4214 0 -170.7107 -29.2893 a 100.0000 100.0000 0 0 1 -0.0000 -0.0000 c -29.2893 -29.2893 -29.2893 -76.4298 -29.2893 -170.7107 L 0 200 c 0 -94.2809 0 -141.4214 29.2893 -170.7107 a 100.0000 100.0000 0 0 1 0.0000 -0.0000 c 29.2893 -29.2893 76.4298 -29.2893 170.7107 -29.2893 Z' />
    </svg>
  );
}
