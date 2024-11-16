import React, { PropsWithChildren } from 'react';
import { useFloatingContext } from './FloatingContext';
import { usePopoverWidthContext } from './PopoverWidthContext';
import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';

interface OwnProps {
  fixWidth?: boolean;
}

type Props = PropsWithChildren<OwnProps>;

export const Popover = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props: Props, propRef) => {
  const { children, fixWidth = false } = props;
  const { width } = usePopoverWidthContext();
  const { context: floatingContext, ...context } = useFloatingContext();
  const contentWrapperStyle = fixWidth ? { width } : { minWidth: width };
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setFloating, propRef, childrenRef]);
  if (!floatingContext.open) return null;
  return (
    <FloatingPortal>
      <FloatingFocusManager
        context={floatingContext}
        modal={context.modal}
        initialFocus={-1}
      >
        <div
          ref={ref}
          style={{
            ...context.floatingStyles,
            ...contentWrapperStyle,
            zIndex: 9999,
          }}
          {...context.getFloatingProps()}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});
