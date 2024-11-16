import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
} from 'react';

export type PopoverWidthContextType = {
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
};
export const PopoverWidthContext = createContext<
  PopoverWidthContextType | undefined
>(undefined);

export function usePopoverWidthContext(): PopoverWidthContextType {
  const context = useContext(PopoverWidthContext);
  if (context === undefined) {
    throw new Error(
      'usePopoverWidthContext must be used inside the <PopoverWidthContextProvider/>',
    );
  }
  return context;
}

interface OwnProps {
  value: PopoverWidthContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function PopoverWidthContextProvider(props: Props) {
  return (
    <PopoverWidthContext.Provider value={props.value}>
      {props.children}
    </PopoverWidthContext.Provider>
  );
}
