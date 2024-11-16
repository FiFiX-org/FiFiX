"use client";
import { useCallback, useState } from "react";
import { Token } from "@/constants/tokens";
import { Slider } from "@/components/ui/slider";
import { TokenSelector } from "../components/ui/token-selector/TokenSelector";
import { useGetBalance } from "./hooks/useGetBalance";
import { useAccount } from "wagmi";

export default function Home() {
  const account = useAccount();
  const [state, setState] = useState<"long" | "short">("long");
  const [pairToken, setPairToken] = useState<Token | null>(null);
  const [volum, setVolum] = useState<string>("");
  const [amount, setAmount] = useState<number>(2);
  const [tlb, setTlb] = useState<boolean>(false);
  const [takeProfit, setTakeProfit] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");

  const balance = useGetBalance(account,pairToken?.address ?? '');

  const onChangeVolum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!Number.isNaN(Number(value))) {
      setVolum(value);
    }
  };

  const onChangeTakeProfit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!Number.isNaN(Number(value))) {
      setTakeProfit(value);
    }
  };
  const onChangeStopLoss = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!Number.isNaN(Number(value))) {
      setStopLoss(value);
    }
  };

  const handleChangeToken = useCallback(
    (token: Token) => {
      setPairToken(token);
    },
    [setPairToken]
  );

  const onChangeTlb = () => {
    setTlb((prev) => !prev);
  };

  return (
    <div className="mt-4 flex items-center justify-center p-8 w-full text-[#462684]">
      <div className=" md:w-1/2 w-full ">
        <div className="flex space-x-2">
          <button
            className={`${
              state === "long" ? "bg-[#59ECD2]" : ""
            }  px-4 py-2 rounded-full`}
            onClick={() => setState("long")}
          >
            long
          </button>
          <button
            className={`${
              state === "short" ? "bg-[#FF648E]" : ""
            } px-4 py-2 rounded-full`}
            onClick={() => setState("short")}
          >
            short
          </button>
        </div>
        <div
          className={`p-4 rounded-lg shadow-lg mt-2 border border-opacity-25 ${
            state === "short"
              ? "bg-[#FFECF0] border-[#FF557A]"
              : " bg-[#EBFFFC] border-[#59ECD2]"
          }`}
        >
          <TokenSelector
            state={state}
            token={pairToken}
            onChangeToken={handleChangeToken}
          />
          <div>
            <input
              placeholder="Volum"
              value={volum}
              onChange={onChangeVolum}
              type="text"
              className={`mt-4 rounded-md form-input w-full focus:border-gray-500 border focus:bg-white focus:ring-0 ${
                state === "short"
                  ? "bg-[#FFFAFB] border-[#FFD3DD]"
                  : "bg-[#F8FFFE] border-[#CAFBF2]"
              }`}
            />
          </div>
          <div className="mt-4">Balance:{balance ?? ' -'}</div> 
          <div
            className={`mt-4 rounded-md p-2.5 flex text-gray-500 w-full border ${
              state === "short"
                ? "bg-[#FFFAFB] border-[#FFD3DD]"
                : "bg-[#F8FFFE] border-[#CAFBF2]"
            }`}
          >
            <span>Price</span>
            <div className="flex-1"></div>
            <span>$</span>
          </div>
          <div
            className={`mt-4 rounded-md p-2.5 text-gray-500 w-full border ${
              state === "short"
                ? "bg-[#FFFAFB] border-[#FFD3DD]"
                : "bg-[#F8FFFE] border-[#CAFBF2]"
            }`}
          >
            <span>
              Amount: <strong>{amount}</strong>
            </span>
            <Slider
              value={[amount]}
              onValueChange={(value) => setAmount(value[0])}
              className="mt-4 py-2"
              defaultValue={[2]}
              max={3}
              min={1}
              step={0.25}
            ></Slider>
          </div>
          <div
            className={`mt-4 rounded-md p-2.5 text-gray-500 w-full border bg-[#E5ECEB] ${
              state === "short"
                ? "bg-[#FFFAFB] border-[#FFD3DD]"
                : "bg-[#F8FFFE] border-[#CAFBF2]"
            }`}
          >
            Liquidation Price <br />
            Position Margin <br />
            Fee
          </div>
          <div className="mt-4">
            <input
              className="form-checkbox"
              id="checkbox"
              type="checkbox"
              checked={tlb}
              onChange={onChangeTlb}
            />
            <label
              className=" ml-2 focus:ring-0 active:ring-0"
              htmlFor="checkbox"
            >
              TP/SL (Entire Position)
            </label>
          </div>
          {tlb && (
            <div
              className={`mt-4 rounded-md p-2.5 text-gray-500 w-full border bg-[#E5ECEB] ${
                state === "short"
                  ? "bg-[#FFFAFB] border-[#FFD3DD]"
                  : "bg-[#F8FFFE] border-[#CAFBF2]"
              }`}
            >
              <input
                placeholder="Take Profit"
                type="text"
                value={takeProfit}
                onChange={onChangeTakeProfit}
                className={`rounded-md p-2.5 border text-gray-500 w-full bg-[#E5ECEB] ${
                  state === "short"
                    ? "bg-[#FFFAFB] border-[#FFD3DD]"
                    : "bg-[#F8FFFE] border-[#CAFBF2]"
                }`}
              />
              <input
                placeholder="Stop loss"
                type="text"
                value={stopLoss}
                onChange={onChangeStopLoss}
                className={`mt-4 rounded-md p-2.5 border text-gray-500 w-full bg-[#E5ECEB] ${
                  state === "short"
                    ? "bg-[#FFFAFB] border-[#FFD3DD]"
                    : "bg-[#F8FFFE] border-[#CAFBF2]"
                }`}
              />
            </div>
          )}
          <button className="btn w-full mt-4">
            {state === "long" ? "Long" : "Short"}
          </button>
        </div>
      </div>
    </div>
  );
}
