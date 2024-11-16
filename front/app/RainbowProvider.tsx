"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http, createConfig } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";

import { sepolia,baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
const queryClient = new QueryClient();

export const config = createConfig({
  chains: [sepolia, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "Uniswap",
      preference: "smartWalletOnly",
    }),
  ],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]:http()
  },
});

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>; 

export function RainbowProvider(props: Props) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({
          accentColor: '#A178DF',
          borderRadius: 'small'
        })}>{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
