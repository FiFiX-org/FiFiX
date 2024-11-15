"use client";
import { useState } from "react";
import { validTokens } from "@/constants/tokens";
import { Slider } from "@/components/ui/slider";

export default function Home() {
  const [state, setState] = useState<"long" | "short">("long");
  const [pairToken, setPairToken] = useState<string>("");
  const [volum, setVolum] = useState<string>("");
  const [amount, setAmount] = useState<number>(2);
  const onChangeVolum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!Number.isNaN(Number(value))) {
      setVolum(value);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center p-8 w-full">
      <div className=" md:w-1/2 w-full text-[#462684]">
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
          <select
            value={pairToken}
            onChange={(e) => setPairToken(e.target.value)}
            style={{ background: state === "short" ? "#FFD3DD" : "#CEF7F1" }}
            className=" block rounded-3xl mt-1 border-transparent focus:ring-0 text-[#462684]"
          >
            <option value="" disabled>
              Select pair token
            </option>
            {validTokens.map((token) => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>

          <div>
            <input
              placeholder="Volum"
              value={volum}
              onChange={onChangeVolum}
              type="text"
              className={`mt-4 rounded-md form-input w-full border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 ${
                state === "short" ? "bg-[#FFFAFB]" : "bg-[#F8FFFE]"
              }`}
            />
          </div>
          <div
            className={`mt-4 rounded-md p-2.5 flex text-gray-500 w-full ${
              state === "short" ? "bg-[#FFFAFB]" : "bg-[#F8FFFE]"
            }`}
          >
            <span>Price</span>
            <div className="flex-1"></div>
            <span>$</span>
          </div>
          <div
            className={`mt-4 rounded-md p-2.5 text-gray-500 w-full ${
              state === "short" ? "bg-[#FFFAFB]" : "bg-[#F8FFFE]"
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
            className={`mt-4 rounded-md p-2.5 text-gray-500 w-full bg-[#E5ECEB] ${
              state === "short" ? "bg-[#FFFAFB]" : "bg-[#F8FFFE]"
            }`}
          >
            Liquidation Price <br />
            Position Margin <br />
            Fee
          </div>
          <button className="btn w-full mt-4">
            {state === "long" ? "Long" : "Short"}
          </button>
        </div>
      </div>
    </div>
  );
}
