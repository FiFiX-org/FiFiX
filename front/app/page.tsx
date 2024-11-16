"use client";
import { useCallback, useEffect, useState } from "react";
import { extraToken, FiFiXAddress, Token } from "@/constants/tokens";
import { Slider } from "@/components/ui/slider";
import { TokenSelector } from "../components/ui/token-selector/TokenSelector";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useAccount, useWriteContract, useSimulateContract } from "wagmi";
import { SwapperABI } from "@/lib/Swapper";
import { zeroAddress } from "viem";
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
import { SpinnerButton } from "@/components/ui/LoadingButton";

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
  const { writeContract, status, data, error } = useWriteContract();
  useEffect(() => {
    if (status === "success") {
      toast({
        icon: <Image src="TickIcon.svg" alt="tick" width={15} height={15} />,
        title: "Successfull",
        link: (
          <a
            className="mt-4 text-sm text-[#9F92C1] underline text-ellipsis max-w-80 text-nowrap overflow-hidden"
            href={`https://eth-sepolia.blockscout.com/tx/${data}`}
            target="_blank"
          >{`https://eth-sepolia.blockscout.com/tx/${data}`}</a>
        ),
        description: "You can see transaction here:",
      });
      setModalOpen(false);
    }
    if (status === "error") {
      toast({
        icon: (
          <Image
            src="Warning.svg"
            className="bg-red-600"
            alt="tick"
            width={15}
            height={15}
          />
        ),
        title: "Error",
        description: <p className="text-nowrap text-ellipsis overflow-hidden">{error.message}</p>,
      });
      setModalOpen(false);
    }
  }, [data, status]);
  const handleOpenPosition = () => {
    writeContract({
      address: FiFiXAddress,
      abi: SwapperABI,
      functionName: "openPosition",
      args: [
        {
          currency0: pairToken?.address ?? "0x",
          currency1: extraToken.address,
          fee: 3000,
          tickSpacing: 60, // Replace with appropriate tick spacing
          hooks: zeroAddress,
        },
        BigInt(Math.ceil(Number(volume) * Math.pow(10, pairToken?.decimals ?? 1))),
        amount * 10,
      ],
    });
  };
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
    },
    [setPairToken]
  );

  const onChangeTlb = () => {
    setTlb((prev) => !prev);
  };

  const orderValue = amount * Number(volume);

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
            <div className="mt-4">Balance:{' '}{balance ?? " -"}</div>
            <div
              className={`mt-4 rounded-md p-2.5 flex text-gray-500 w-full border ${
                state === "short"
                  ? "bg-[#FFFAFB] border-[#FFD3DD]"
                  : "bg-[#F8FFFE] border-[#CAFBF2]"
              }`}
            >
              <span>Price</span>
              <div className="flex-1"></div>
              <span>{pairToken?.price}{' '}USDC</span>
            </div>
            <div className="mt-4">Leverage: {amount}</div>
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
                step={0.1}
              ></Slider>
              {pairToken && (
                <span className="text-sm ml-4 w-[30%] text-nowrap overflow-hidden">
                  <strong>
                    {orderValue} {pairToken?.symbol}
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
                <span>Fee</span>
                <span>0.39%</span>
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
                    <span>{pairToken?.price} {' '} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Qty</span>
                    <span>
                      {orderValue}{' '} {pairToken?.symbol}
                    </span>
                  </div>{" "}
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Order Value</span>
                    <span>{orderValue * (pairToken?.price ?? 1)}{' '}USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Fee</span>
                    <span>{orderValue * (pairToken?.price ?? 1) * 0.0039} (0.39%){' '} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Estimated Liq. Price</span>
                    <span>5,538.63 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9F92C1]">Leverage</span>
                    <span>{amount}x</span>
                  </div>
                </div>
                <DialogFooter className="flex w-full justify-between items-center mt-4">
                  <SpinnerButton
                    loading={status === "pending"}
                    disabled={status === "pending"}
                    onClick={handleOpenPosition}
                    className={`w-1/2 ${
                      state === "short" ? "bg-[#FF648E]" : "bg-[#3ACCB3]"
                    } rounded-md px-4 py-2 text-white`}
                  >
                    Confirm
                  </SpinnerButton>
                  <button
                    disabled={status === "pending"}
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
