import {
  cloneElement,
  type ComponentProps,
  forwardRef,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefAttributes,
} from 'react';

import { SlotOutletContext } from '~/components/base/slot-outlet';
import { SlotRoot } from '~/components/base/slot-root';
import { useMergedRef } from '~/hooks/use-merged-ref';
import { expectToSatisfy } from '~/shared/expect';

type RootElement = ReactElement<ComponentProps<typeof SlotRoot>>;

type TargetElement = ReactElement<HTMLAttributes<HTMLElement>> & { ref?: Ref<HTMLElement> };

function assignClassName(target: HTMLAttributes<HTMLElement>, source: string | undefined) {
  if (target.className !== undefined && source !== undefined) {
    target.className += ` ${source}`;
  }
}

function assignRef(target: RefAttributes<HTMLElement>, source: Ref<HTMLElement>) {
  target.ref = source;
}

function getTarget(node: ReactNode): TargetElement {
  if (isRoot(node)) {
    const target = expectToSatisfy(node.props.target, isTarget);

    return cloneElement(
      target,
      undefined,
      <SlotOutletContext.Provider value={target.props.children}>{node.props.children}</SlotOutletContext.Provider>,
    );
  }

  return expectToSatisfy(node, isTarget);
}

function isRoot(node: unknown): node is RootElement {
  return isValidElement(node) && node.type === SlotRoot;
}

function isTarget(node: unknown): node is TargetElement {
  return isValidElement(node);
}

export const Slot = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Slot({ children, ...props }, ref) {
  const target = getTarget(children);
  const targetRef = useMergedRef<HTMLElement>([ref, target.ref]);
  const targetProps = props as HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>;

  assignClassName(targetProps, target.props.className);
  assignRef(targetProps, targetRef);

  return cloneElement(target, targetProps);
});
