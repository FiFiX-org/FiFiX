"use client";
import { useCallback, useState } from "react";
import { Token } from "@/constants/tokens";
import { Slider } from "@/components/ui/slider";
import { TokenSelector } from "../components/ui/token-selector/TokenSelector";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useAccount } from "wagmi";
import { Positions } from "./Positions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { NumberOutput } from "@/components/ui/outputs/NumberOutput";
import Image from "next/image";

export default function Home() {
  const account = useAccount();
  const { toast } = useToast();

  const [state, setState] = useState<"long" | "short">("long");
  const [pairToken, setPairToken] = useState<Token | null>(null);
  const [volume, setVolume] = useState<string>("");
  const [amount, setAmount] = useState<number>(2);
  const [tlb, setTlb] = useState<boolean>(false);
  const [takeProfit, setTakeProfit] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const balance = useGetBalance(account, pairToken?.address ?? "");

  const onChangeVolum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!Number.isNaN(Number(value))) {
      setVolume(value);
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
      toast({
        icon: <Image src="/TickIcon.svg" alt="Tick" width={15} height={15} />,
        title: "Order Submitted Failed",
        description: "12 ETHUSD contracts failed at 3121.5 price",
      });
    },
    [setPairToken]
  );

  const onChangeTlb = () => {
    setTlb((prev) => !prev);
  };

  return (
    <div className="container mx-auto">
      <div className="mt-4 flex items-center justify-center md:p-8 p-4 w-full text-[#462684]">
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
                placeholder="Volume"
                value={volume}
                onChange={onChangeVolum}
                type="text"
                className={`mt-4 rounded-md form-input w-full focus:border-gray-500 border focus:bg-white focus:ring-0 ${
                  state === "short"
                    ? "bg-[#FFFAFB] border-[#FFD3DD]"
                    : "bg-[#F8FFFE] border-[#CAFBF2]"
                }`}
              />
            </div>
            <div className="mt-4">Balance:{balance ?? " -"}</div>
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
              className={`mt-4 rounded-md text-gray-500 w-full items-center flex`}
            >
              <Slider
                disabled={!pairToken}
                value={[amount]}
                onValueChange={(value) => setAmount(value[0])}
                className="py-2 disabled:opacity-20"
                style={{ opacity: !pairToken ? 0.3 : 1 }}
                defaultValue={[2]}
                max={3}
                min={1}
                step={0.25}
              ></Slider>
              {pairToken && (
                <span className="text-sm ml-4 w-[10%] text-nowrap">
                  <strong>
                    {amount} {pairToken?.symbol}
                  </strong>
                </span>
              )}
            </div>
            <div
              className={` mt-4 rounded-md p-2.5 text-gray-500 w-full space-y-4 border bg-[#E5ECEB] ${
                state === "short"
                  ? "bg-[#FFFAFB] border-[#FFD3DD]"
                  : "bg-[#F8FFFE] border-[#CAFBF2]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Liquidation Price</span> <span>-</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Position Margin</span>
                <span>-</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Fee</span>
                <span>-</span>
              </div>
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
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogTrigger asChild>
                <button
                  className="btn w-full mt-4 disabled:opacity-30"
                  disabled={!pairToken || !volume}
                >
                  {state === "long" ? "Long" : "Short"}
                </button>
              </DialogTrigger>
              <DialogContent className="shadow-md bg-[#F3F0FF]">
                <DialogHeader>
                  <DialogTitle className="mb-4">
                    {state === "short" ? (
                      <span className="text-red-500">Limit Sell</span>
                    ) : (
                      <span className="text-[#3ACCB3]">Limit Buy</span>
                    )}
                    <span className="text-[#462684] ml-4">
                      {pairToken?.symbol}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col text-sm space-y-4 text-[#462684]">
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Order Price</span>
                    <span>3,131.00 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Qty</span>
                    <span>
                      <NumberOutput value={3923} /> ETH
                    </span>
                  </div>{" "}
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Order Cost</span>
                    <span>12,383.6075 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Order value</span>
                    <span>122,422.1000 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Estimated Liq. Price</span>
                    <span>5,538.63 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Leverage</span>
                    <span>Cross 10.00x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Time in Force</span>
                    <span>Good-till-Canceled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Initial Margin Rate</span>
                    <span>Cross 10.00x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">
                      Maintenance Margin Rate
                    </span>
                    <span>Cross 10.00x</span>
                  </div>
                </div>
                <DialogFooter className="flex w-full justify-between items-center mt-4">
                  <button
                    className={`w-1/2 ${
                      state === "short" ? "bg-[#FF648E]" : "bg-[#3ACCB3]"
                    } rounded-md px-4 py-2 text-white`}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-1/2 bg-[#AEA3CC] rounded-md px-4 py-2 text-white"
                  >
                    Cancel
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Positions />
    </div>
  );
}
