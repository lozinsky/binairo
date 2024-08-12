/* eslint-disable react/jsx-key */
/* @vitest-environment jsdom */

import { render } from '@testing-library/react';
import { createRef, type ElementRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { expect, test } from 'vitest';

import { Slot } from './slot';
import { SlotOutlet } from './slot-outlet';
import { SlotRoot } from './slot-root';

test.each([
  <Slot>
    <span>
      Foo
      <span>Bar</span>
    </span>
  </Slot>,
  <Slot className='slot'>
    <span>
      Foo
      <span>Bar</span>
    </span>
  </Slot>,
  <Slot className='slot'>
    <span className='foo'>
      Foo
      <span>Bar</span>
    </span>
  </Slot>,
  <Slot data-slot='slot'>
    <span>
      Foo
      <span>Bar</span>
    </span>
  </Slot>,
  <Slot data-slot='slot'>
    <span data-foo='foo'>
      Foo
      <span>Bar</span>
    </span>
  </Slot>,
  <Slot>
    <SlotRoot target={<span>Foo</span>}>
      <SlotOutlet />
      <span>Bar</span>
    </SlotRoot>
  </Slot>,
  <Slot>
    <SlotRoot target={<span>Bar</span>}>
      Foo
      <span>
        <SlotOutlet />
      </span>
    </SlotRoot>
  </Slot>,
  <Slot className='slot'>
    <SlotRoot target={<span>Foo</span>}>
      <SlotOutlet />
      <span>Bar</span>
    </SlotRoot>
  </Slot>,
  <Slot className='slot'>
    <SlotRoot target={<span className='foo'>Foo</span>}>
      <SlotOutlet />
      <span>Bar</span>
    </SlotRoot>
  </Slot>,
  <Slot data-slot='slot'>
    <SlotRoot target={<span>Foo</span>}>
      <SlotOutlet />
      <span>Bar</span>
    </SlotRoot>
  </Slot>,
  <Slot data-slot='slot'>
    <SlotRoot target={<span data-foo='foo'>Foo</span>}>
      <SlotOutlet />
      <span>Bar</span>
    </SlotRoot>
  </Slot>,
])('renders slot', (children) => {
  expect(render(children).asFragment()).toMatchSnapshot();
});

test.each([
  forwardRef<unknown>(function Component(props, ref) {
    const slotRef = useRef<ElementRef<typeof Slot>>(null);

    useImperativeHandle(ref, () => ({
      slotRef,
    }));

    return (
      <Slot ref={slotRef}>
        <span>
          Foo
          <span>Bar</span>
        </span>
      </Slot>
    );
  }),
  forwardRef<unknown>(function Component(props, ref) {
    const slotRef = useRef<ElementRef<typeof Slot>>(null);

    useImperativeHandle(ref, () => ({
      slotRef,
    }));

    return (
      <Slot ref={slotRef}>
        <SlotRoot target={<span>Foo</span>}>
          <SlotOutlet />
          <span>Bar</span>
        </SlotRoot>
      </Slot>
    );
  }),
  forwardRef<unknown>(function Component(props, ref) {
    const slotRef = useRef<ElementRef<typeof Slot>>(null);
    const spanRef = useRef<ElementRef<'span'>>(null);

    useImperativeHandle(ref, () => ({
      slotRef,
      spanRef,
    }));

    return (
      <Slot ref={slotRef}>
        <span ref={spanRef}>
          Foo
          <span>Bar</span>
        </span>
      </Slot>
    );
  }),
  forwardRef<unknown>(function Component(props, ref) {
    const slotRef = useRef<ElementRef<typeof Slot>>(null);
    const spanRef = useRef<ElementRef<'span'>>(null);

    useImperativeHandle(ref, () => ({
      slotRef,
      spanRef,
    }));

    return (
      <Slot ref={slotRef}>
        <SlotRoot target={<span ref={spanRef}>Foo</span>}>
          <SlotOutlet />
          <span>Bar</span>
        </SlotRoot>
      </Slot>
    );
  }),
])('renders slot with ref', (Component) => {
  const ref = createRef();

  render(<Component ref={ref} />);
  expect(ref.current).toMatchSnapshot();
});
