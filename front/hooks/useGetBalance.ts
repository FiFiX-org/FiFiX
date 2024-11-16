import { tokenMaps } from "@/constants/tokens";
import { useEffect, useState } from "react";
import { UseAccountReturnType } from "wagmi";
import { balanceOf } from "../logic/token";

export const useGetBalance = (account:UseAccountReturnType,pairToken:string):(string|undefined)=>{
    const [balance, setBalance] = useState<string>();
    useEffect(() => {
        if(account.address && pairToken){
          balanceOf(account.address,tokenMaps.get(pairToken)!).then(value=>setBalance(value));
        }
    },);
    return balance;
}
