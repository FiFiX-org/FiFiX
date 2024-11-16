import Image from 'next/image';
import { PropsWithChildren } from 'react';

interface OwnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

type Props = PropsWithChildren<OwnProps>;

export function SpinnerButton(props: Props) {
  const { loading, children, ...buttonProps } = props;
  return (
    <button {...buttonProps}>
      {loading && (
        <Image src='/SpinnerLoading.svg' alt='loading' width={5} height={5} className="-ml-1 mr-1 inline-block h-5 w-5 animate-spin text-white" />
      )}
      {children}
    </button>
  );
}
