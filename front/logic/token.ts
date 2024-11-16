import { Address, formatUnits } from "viem";
import { publicClient } from "../lib/client";
import { erc20Abi } from "viem";
import { Token } from "@/constants/tokens";
export const balanceOf = async(address:Address, token:Token): Promise<string>=>{
    const balance = await publicClient.readContract({
        address: token.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args:[address]
      })
    return formatUnits(balance,token.decimals);
}