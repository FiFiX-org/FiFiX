import { PropsWithChildren } from "react";

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function Navbar(props: Props) {
  return (
    <header className="sticky top-0 left-0 bg-white w-full">
      <div className="flex">
        <button className="btn">Logo</button>
        <div className="flex-1" />
        <button className="btn">Connect Wallet</button>
      </div>
    </header>
  );
}
