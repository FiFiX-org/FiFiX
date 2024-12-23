export const SwapperABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_owner", type: "address", internalType: "address" },
      { name: "_swapRouter", type: "address", internalType: "address" },
      {
        name: "_poolAddressesProvider",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ADDRESSES_PROVIDER",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IPoolAddressesProvider",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_PRICE_LIMIT",
    inputs: [],
    outputs: [{ name: "", type: "uint160", internalType: "uint160" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MIN_PRICE_LIMIT",
    inputs: [],
    outputs: [{ name: "", type: "uint160", internalType: "uint160" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "POOL",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IPool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "executeOperation",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "premium", type: "uint256", internalType: "uint256" },
      { name: "initiator", type: "address", internalType: "address" },
      { name: "params", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "openPosition",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "tickSpacing", type: "int24", internalType: "int24" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
        ],
      },
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "leverage", type: "uint8", internalType: "uint8" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swap",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "tickSpacing", type: "int24", internalType: "int24" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
        ],
      },
      { name: "amountSpecified", type: "uint256", internalType: "uint256" },
      { name: "zeroForOne", type: "bool", internalType: "bool" },
      { name: "hookData", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;
