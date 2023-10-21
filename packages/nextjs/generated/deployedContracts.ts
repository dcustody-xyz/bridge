const contracts = {
  420: [
    {
      name: "Optimism Goerli",
      chainId: "420",
      contracts: {
        Bridge: {
          address: "0xE6C05c8A1D17b39fEAC89E866ca6A3b81Af543B6",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_wormholeRelayer",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_tokenBridge",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_wormhole",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "target",
                  type: "address",
                },
              ],
              name: "AddressEmptyCode",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "AddressInsufficientBalance",
              type: "error",
            },
            {
              inputs: [],
              name: "FailedInnerCall",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "expected",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "actual",
                  type: "uint256",
                },
              ],
              name: "LessThanExpected",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "NotAnEvmAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "OwnableInvalidOwner",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "OwnableUnauthorizedAccount",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
              ],
              name: "SafeERC20FailedOperation",
              type: "error",
            },
            {
              inputs: [],
              name: "SwapperFailed",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_oldSwapper",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_oldSwapperApprover",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_newSwapper",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_newSwapperApprover",
                  type: "address",
                },
              ],
              name: "SwapperChanged",
              type: "event",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "targetChain",
                  type: "uint16",
                },
              ],
              name: "quoteCrossChainDeposit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "cost",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "payload",
                  type: "bytes",
                },
                {
                  internalType: "bytes[]",
                  name: "additionalVaas",
                  type: "bytes[]",
                },
                {
                  internalType: "bytes32",
                  name: "sourceAddress",
                  type: "bytes32",
                },
                {
                  internalType: "uint16",
                  name: "sourceChain",
                  type: "uint16",
                },
                {
                  internalType: "bytes32",
                  name: "deliveryHash",
                  type: "bytes32",
                },
              ],
              name: "receiveWormholeMessages",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "seenDeliveryVaaHashes",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "targetChain",
                  type: "uint16",
                },
                {
                  internalType: "address",
                  name: "targetBridge",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "destinationToken",
                  type: "address",
                },
              ],
              name: "sendCrossChainDeposit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "sourceChain",
                  type: "uint16",
                },
                {
                  internalType: "bytes32",
                  name: "sourceAddress",
                  type: "bytes32",
                },
              ],
              name: "setRegisteredSender",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_swapper",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_swapperApprover",
                  type: "address",
                },
              ],
              name: "setSwapper",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "swapper",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "swapperApprover",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tokenBridge",
              outputs: [
                {
                  internalType: "contract ITokenBridge",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "wormhole",
              outputs: [
                {
                  internalType: "contract IWormhole",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "wormholeRelayer",
              outputs: [
                {
                  internalType: "contract IWormholeRelayer",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      name: "Anvil",
      chainId: "31337",
      contracts: {
        Bridge: {
          address: "0x90Cc02902826f0d85C8d68073DCe7299c97D79d8",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_wormholeRelayer",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_tokenBridge",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_wormhole",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "target",
                  type: "address",
                },
              ],
              name: "AddressEmptyCode",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "AddressInsufficientBalance",
              type: "error",
            },
            {
              inputs: [],
              name: "FailedInnerCall",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "expected",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "actual",
                  type: "uint256",
                },
              ],
              name: "LessThanExpected",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "NotAnEvmAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "OwnableInvalidOwner",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "OwnableUnauthorizedAccount",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
              ],
              name: "SafeERC20FailedOperation",
              type: "error",
            },
            {
              inputs: [],
              name: "SwapperFailed",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_oldSwapper",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_oldSwapperApprover",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_newSwapper",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_newSwapperApprover",
                  type: "address",
                },
              ],
              name: "SwapperChanged",
              type: "event",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "targetChain",
                  type: "uint16",
                },
              ],
              name: "quoteCrossChainDeposit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "cost",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "payload",
                  type: "bytes",
                },
                {
                  internalType: "bytes[]",
                  name: "additionalVaas",
                  type: "bytes[]",
                },
                {
                  internalType: "bytes32",
                  name: "sourceAddress",
                  type: "bytes32",
                },
                {
                  internalType: "uint16",
                  name: "sourceChain",
                  type: "uint16",
                },
                {
                  internalType: "bytes32",
                  name: "deliveryHash",
                  type: "bytes32",
                },
              ],
              name: "receiveWormholeMessages",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "seenDeliveryVaaHashes",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "targetChain",
                  type: "uint16",
                },
                {
                  internalType: "address",
                  name: "targetBridge",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "destinationToken",
                  type: "address",
                },
              ],
              name: "sendCrossChainDeposit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "sourceChain",
                  type: "uint16",
                },
                {
                  internalType: "bytes32",
                  name: "sourceAddress",
                  type: "bytes32",
                },
              ],
              name: "setRegisteredSender",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_swapper",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_swapperApprover",
                  type: "address",
                },
              ],
              name: "setSwapper",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "swapper",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "swapperApprover",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tokenBridge",
              outputs: [
                {
                  internalType: "contract ITokenBridge",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "wormhole",
              outputs: [
                {
                  internalType: "contract IWormhole",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "wormholeRelayer",
              outputs: [
                {
                  internalType: "contract IWormholeRelayer",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  80001: [
    {
      name: "Polygon Mumbai",
      chainId: "80001",
      contracts: {
        Bridge: {
          address: "0x9ba6cE48764ae0Ec167C68cF12948b3a47125e2e",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_wormholeRelayer",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_tokenBridge",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_wormhole",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "target",
                  type: "address",
                },
              ],
              name: "AddressEmptyCode",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "AddressInsufficientBalance",
              type: "error",
            },
            {
              inputs: [],
              name: "FailedInnerCall",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "expected",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "actual",
                  type: "uint256",
                },
              ],
              name: "LessThanExpected",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "NotAnEvmAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "OwnableInvalidOwner",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "OwnableUnauthorizedAccount",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
              ],
              name: "SafeERC20FailedOperation",
              type: "error",
            },
            {
              inputs: [],
              name: "SwapperFailed",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_oldSwapper",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_oldSwapperApprover",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_newSwapper",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_newSwapperApprover",
                  type: "address",
                },
              ],
              name: "SwapperChanged",
              type: "event",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "targetChain",
                  type: "uint16",
                },
              ],
              name: "quoteCrossChainDeposit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "cost",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "payload",
                  type: "bytes",
                },
                {
                  internalType: "bytes[]",
                  name: "additionalVaas",
                  type: "bytes[]",
                },
                {
                  internalType: "bytes32",
                  name: "sourceAddress",
                  type: "bytes32",
                },
                {
                  internalType: "uint16",
                  name: "sourceChain",
                  type: "uint16",
                },
                {
                  internalType: "bytes32",
                  name: "deliveryHash",
                  type: "bytes32",
                },
              ],
              name: "receiveWormholeMessages",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "seenDeliveryVaaHashes",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "targetChain",
                  type: "uint16",
                },
                {
                  internalType: "address",
                  name: "targetBridge",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "destinationToken",
                  type: "address",
                },
              ],
              name: "sendCrossChainDeposit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "sourceChain",
                  type: "uint16",
                },
                {
                  internalType: "bytes32",
                  name: "sourceAddress",
                  type: "bytes32",
                },
              ],
              name: "setRegisteredSender",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_swapper",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_swapperApprover",
                  type: "address",
                },
              ],
              name: "setSwapper",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "swapper",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "swapperApprover",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tokenBridge",
              outputs: [
                {
                  internalType: "contract ITokenBridge",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "wormhole",
              outputs: [
                {
                  internalType: "contract IWormhole",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "wormholeRelayer",
              outputs: [
                {
                  internalType: "contract IWormholeRelayer",
                  name: "",
                  type: "address",
                },
              ],
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
