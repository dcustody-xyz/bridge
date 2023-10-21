import { useEffect, useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useNetwork, usePublicClient, useWalletClient } from "wagmi";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { erc20Abi } from "~~/abis/erc20";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const wormholeChainId = 24; // Only Optimism for now
const sourceBridge = "0x9ba6cE48764ae0Ec167C68cF12948b3a47125e2e";
const targetBridge = "0xE6C05c8A1D17b39fEAC89E866ca6A3b81Af543B6";
const tokenDecimals = 6;
const tokenAddress = "0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7";
const destinationTokens = {
  [tokenAddress]: "0xC8A4FB931e8D77df8497790381CA7d228E68a41b",
};

export const ContractInteractionWormhole = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [newRecipient, setNewRecipient] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [needsApproval, setNeedsApproval] = useState(false);
  // const tokenContract = getContract({
  //   address: tokenAddress,
  //   abi: erc20Abi,
  //   publicClient,
  // });
  //

  const approveAsync = async () => {
    try {
      // Call the approve method on the tokenContract
      setLoading(true);

      const result = await walletClient?.writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [sourceBridge, parseUnits(newAmount, tokenDecimals)],
      });
      console.log("Approval successful:", result);
      // Re-check allowance after approval
      await checkAllowance();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Approval failed:", error);
    }
  };

  const checkAllowance = async () => {
    if (!address) return;

    try {
      const allowance = (await publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, sourceBridge],
      })) as bigint;

      setNeedsApproval(allowance < parseUnits(newAmount, tokenDecimals));
    } catch (error) {
      console.error("Failed to check allowance:", error);
    }
  };

  useEffect(() => {
    checkAllowance();
    setEnabled(chain?.id === 80001);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAmount, newRecipient, chain]);

  const { data: estimatedGas } = useScaffoldContractRead({
    contractName: "Bridge",
    functionName: "quoteCrossChainDeposit",
    args: [wormholeChainId],
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Bridge",
    functionName: "sendCrossChainDeposit",
    args: [
      wormholeChainId,
      targetBridge,
      newRecipient,
      parseUnits(newAmount, tokenDecimals),
      tokenAddress,
      destinationTokens[tokenAddress],
    ],
    value: estimatedGas,
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex bg-base-300 relative pb-10">
      <DiamondIcon className="absolute top-24" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" />
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">
            <span className="text-3xl">👋🏻</span>
            <div>
              <div>
                This is a sample UI for interacting with Wormhole bridge contracts.
                <strong>Limited from Polygon Mumbai to Optimism Goerli for now.</strong>
              </div>
            </div>
          </div>
          <button
            className="btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md"
            onClick={() => setVisible(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Bridge and swap</span>
          <span className="text-lighten mt-2">USDC from Polygon Mumbai to hETH on Optimism Goerli</span>

          <div className="mt-6">
            <div className="mt-4">
              <AddressInput
                placeholder="Input recipient address (on target chain)"
                value={newRecipient}
                onChange={setNewRecipient}
              />
            </div>
            <div className="mt-4">
              <InputBase placeholder="Amount of USDC to transfer" value={newAmount} onChange={setNewAmount} />
            </div>
            <div className="flex rounded-full p-1 flex-shrink-0 mt-5">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={async () => {
                    if (needsApproval) {
                      // Assume approveAsync is a function you've defined to handle the approval transaction
                      await approveAsync();
                    } else {
                      await writeAsync();
                      await checkAllowance();
                    }
                  }}
                  disabled={!enabled || isLoading || loading}
                >
                  {isLoading || loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : needsApproval ? (
                    "Approve"
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">{formatUnits(BigInt(estimatedGas || "0"), 18)} Matic + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
