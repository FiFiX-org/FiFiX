import React, { PropsWithChildren } from 'react';

interface OwnProps {
  value: number;
}

const formatNumber = new Intl.NumberFormat('en-US');

export type Props = PropsWithChildren<OwnProps>;

export function NumberOutput(props: Props) {
  const text = formatNumber.format(props.value);
  return <span>{text}</span>;
}
