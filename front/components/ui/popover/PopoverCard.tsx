import { PropsWithChildren } from 'react';

interface OwnProps {
  title?: string;
}

type Props = PropsWithChildren<OwnProps>;

export function PopoverCard(props: Props) {
  const { title, children } = props;
  return (
    <div className="relative rounded-md bg-primary-100 shadow-md">
      {title && (
        <header className="bg-indigo text-sm text-white static top-0 p-2 font-bold">
          {title}
        </header>
      )}
      {children}
    </div>
  );
}
