import { Anchor, Popover, PopoverControl } from "@/components/ui/popover";
import { PropsWithChildren, useState } from "react";
import { extraToken, Token, validTokens } from "@/constants/tokens";
import Image from "next/image";
import { TokenRow } from "./TokenRow";

interface OwnProps {
  state: "long" | "short";
  token: Token | null;
  onChangeToken: (toke: Token) => void;
}

type Props = PropsWithChildren<OwnProps>;

export function TokenSelector(props: Props) {
  const { state, onChangeToken, token } = props;
  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };
  const handleSelectToken = (token: Token) => {
    onChangeToken(token);
    setOpen(false);
  };
  return (
    <PopoverControl open={open} setOpen={setOpen}>
      <Anchor>
        <button
          style={{ background: state === "short" ? "#FFD3DD" : "#CEF7F1" }}
          className="block rounded-3xl mt-1 p-2.5"
          onClick={handleToggle}
        >
          {token ? (
            <div className="flex items-center text-sm">
              <div className="flex items-center border-r-2 border-gray-400 pr-2">
                <Image
                  src={token.logo}
                  alt={token.symbol}
                  width={25}
                  height={25}
                />
                <span className="ml-2">{token.name}</span>
              </div>
              <div className="flex items-center ml-2">
                <Image
                  src={extraToken.logo}
                  alt={extraToken.symbol}
                  width={25}
                  height={25}
                />
                <span className="ml-2">{extraToken.name}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between w-40">
              <span>Select Token</span>
              <Image src='/ArrowDown.svg' alt="arrow-down" width={15} height={15} />
            </div>
          )}
        </button>
      </Anchor>
      <Popover width={"200px"}>
        <div className="bg-[#F8FFFE] p-2 shadow-xl rounded-md text-sm w-72">
          {validTokens.map((token, index) => (
            <div
              className="w-full flex items-center cursor-pointer hover:bg-slate-100 hover:rounded-lg"
              key={index}
              onClick={() => handleSelectToken(token)}
            >
              <TokenRow token={token} />
              <TokenRow token={extraToken} />
            </div>
          ))}
        </div>
      </Popover>
    </PopoverControl>
  );
}
