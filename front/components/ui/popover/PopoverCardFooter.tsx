import { PropsWithChildren } from 'react';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function PopoverCardFooter(props: Props) {
  const { children } = props;
  return <div className="stactic flex justify-end bottom-0 p-2 border-t-2 border-gray-400">{children}</div>;
}
