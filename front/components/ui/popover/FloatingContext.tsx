import {
  ReferenceType,
  UseFloatingReturn,
  UseInteractionsReturn,
} from '@floating-ui/react';
import { createContext, PropsWithChildren, useContext } from 'react';

export type FloatingContextType = UseFloatingReturn<ReferenceType> &
  UseInteractionsReturn & { modal: boolean };

export const FloatingContext = createContext<FloatingContextType | undefined>(
  undefined,
);

export function useFloatingContext(
  value?: FloatingContextType,
): FloatingContextType {
  const context = useContext(FloatingContext);
  if (value !== undefined) {
    return value;
  }
  if (context === undefined) {
    throw new Error(
      'useFloatingContext must be used inside the <FloatingContextProvider/>',
    );
  }
  return context;
}

interface OwnProps {
  value: FloatingContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function FloatingContextProvider(props: Props) {
  return (
    <FloatingContext.Provider value={props.value}>
      {props.children}
    </FloatingContext.Provider>
  );
}
