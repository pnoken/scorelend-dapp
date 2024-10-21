//AnimaPOP contract

const contracts = {
  8453: [
    {
      chainId: "8453",
      name: "base",
      contracts: {
        AnimaPOP: {
          address: "0xAd5B23B4bC9c8C5416eE7Fe29eB5FDbE2f0E0b66",
          abi: [
            {
              inputs: [
                { internalType: "address", name: "account", type: "address" },
              ],
              name: "getMasterToken",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                { internalType: "uint256", name: "tokenId", type: "uint256" },
              ],
              name: "tokenURI",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
