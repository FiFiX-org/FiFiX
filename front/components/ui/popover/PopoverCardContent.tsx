import { PropsWithChildren } from 'react';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function PopoverCardContent(props: Props) {
  const { children } = props;
  return (
    <div className="scrollbar bg-white overflow-y-auto  rounded-b-sm ">
      {children}
    </div>
  );
}
