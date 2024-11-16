import { Token } from "@/constants/tokens";
import Image from "next/image";
import { PropsWithChildren } from "react";

interface OwnProps {
  token: Token;
}

type Props = PropsWithChildren<OwnProps>;

export function TokenRow(props: Props) {
  const { token } = props;
  return (
    <div className="w-1/2 flex items-center m-2 border-r-2 last:border-none">
      <Image src={token.logo} alt={token.symbol} width={25} height={25} />
      <div className="inline-flex flex-col ml-2">
        <span className="">{token.name}</span>
        <span key={token.address} className="text-gray-400">
          {token.symbol}
        </span>
      </div>
    </div>
  );
}
