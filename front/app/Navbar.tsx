import Image from "next/image";
import { PropsWithChildren } from "react";

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function Navbar(props: Props) {
  return (
    <header className="sticky top-0 left-0 bg-gradient-to-r p-8 from-indigo-200 via-purple-200 to-pink-200 w-full">
      <div className="flex">
        <Image src="./Logo.svg" alt="FiFix" width={100} height={50} />
        <div className="flex-1" />
        <button className="btn">Connect Wallet</button>
      </div>
    </header>
  );
}
