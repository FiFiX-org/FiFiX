import { PropsWithChildren, useMemo, useState } from 'react';
import { FloatingContextProvider } from './FloatingContext';
import { PopoverWidthContextProvider } from './PopoverWidthContext';
import {
  useFloating,
  useDismiss,
  useInteractions,
  useRole,
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';

interface OwnProps {
  placement?: Placement;
  modal?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

type Props = PropsWithChildren<OwnProps>;

export function PopoverControl(props: Props) {
  const {
    children,
    open,
    setOpen,
    modal = false,
    placement = 'bottom-start',
  } = props;
  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'end',
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });
  const dismiss = useDismiss(data.context);
  const role = useRole(data.context);
  const interactions = useInteractions([ dismiss, role]);
  const [width, setWidth] = useState<number>(0);

  const floatingContext = useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
    }),
    [open, setOpen, interactions, data, modal],
  );

  return (
    <PopoverWidthContextProvider value={{ width, setWidth }}>
      <FloatingContextProvider value={floatingContext}>
        {children}
      </FloatingContextProvider>
    </PopoverWidthContextProvider>
  );
}
