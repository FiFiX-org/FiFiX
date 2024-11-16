import React, { PropsWithChildren, useCallback } from 'react';
import { Size, useResizeCallback } from '../use-resize';
import { useFloatingContext } from './FloatingContext';
import { usePopoverWidthContext } from './PopoverWidthContext';
import { useMergeRefs } from '@floating-ui/react';

interface OwnProps {
  fullwidth?: boolean;
}

type Props = PropsWithChildren<OwnProps>;

export const Anchor = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & Props
>((props: Props, propRef) => {
  const { children, fullwidth = false } = props;
  const { context, getReferenceProps } = useFloatingContext();
  const { setWidth } = usePopoverWidthContext();
  const onResize = useCallback(
    ({ width }: Size) => {
      setWidth(width);
    },
    [setWidth],
  );
  const childrenRef = (children as any).ref;
  const referenceRef = useMergeRefs([
    context.refs.setReference,
    propRef,
    childrenRef,
  ]);
  const [ref] = useResizeCallback(onResize);
  const openClassName = context.open
    ? 'inline-block pointer-events-none'
    : 'inline-block';
  const widthClassName = fullwidth && 'w-full';
  return (
    <div
      ref={referenceRef}
      data-state={context.open ? 'open' : 'closed'}
      {...getReferenceProps()}
      className={`${widthClassName} ${openClassName}`}
    >
      <div ref={ref} />
      {children}
    </div>
  );
});
