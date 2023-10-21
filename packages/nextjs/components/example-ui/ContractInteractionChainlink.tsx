import { useEffect, useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { encodeAbiParameters, formatUnits, parseAbiParameters, parseUnits } from "viem";
import { useAccount, useNetwork, usePublicClient, useWalletClient } from "wagmi";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { erc20Abi } from "~~/abis/erc20";
import { senderAbi } from "~~/abis/sender";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";

const chainlinkMumbaiSelector = 12532609583862916517n;
const senderAddress = "0xd895EA725E460785290F460cA9302B23CA548843";
const tokenDecimals = 18;
const linkAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
const ccipAddress = "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05";
const paraswap =
  "0x54e3f31b0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000c087f8d6a1f14f71bb7cc7e1b061ca297af75550000000000000000000000000000000000000000000000008ac7230489e8000000000000000000000000000000000000000000000000000035c64aaa57448150000000000000000000000000000000000000000000000000360b7810d334203200000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000a10584d7fa26b56f236c68214a84dbefce6643610000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003e00000000000000000000000000000000000000000000000000000000065348fc7207c0e77657642cfa6130f1d5895bdf1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f3938337f7294fef84e9b2c6d548a93f956cc28100000000000000000000000000000000000000000000000000000000000000e491a32b69000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000008ac7230489e8000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000004de57aad0285cf5f62247738551cd640b8503c633e80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000008ac7230489e800000000000000000000000000000000000000000000000000000000000000000000";

export const ContractInteractionChainlink = () => {
  const publicClient = usePublicClient();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fee, setFee] = useState(0n);
  const [newRecipient, setNewRecipient] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [needsApproval, setNeedsApproval] = useState(false);
  const [needsLinkApproval, setNeedsLinkApproval] = useState(false);
  // const tokenContract = getContract({
  //   address: tokenAddress,
  //   abi: erc20Abi,
  //   publicClient,
  // });
  const approveAsync = async () => {
    try {
      setLoading(true);

      const result = await walletClient?.writeContract({
        address: senderAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [senderAddress, parseUnits(newAmount, tokenDecimals)],
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

  const approveLinkAsync = async () => {
    try {
      setLoading(true);

      const result = await walletClient?.writeContract({
        address: linkAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [senderAddress, fee],
      });
      console.log("Approval successful:", result);
      // Re-check allowance after approval
      await checkLinkAllowance();
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
        address: ccipAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, senderAddress],
      })) as bigint;

      setNeedsApproval(allowance < parseUnits(newAmount, tokenDecimals));
    } catch (error) {
      console.error("Failed to check allowance:", error);
    }
  };

  const checkLinkAllowance = async () => {
    if (!address) return;

    try {
      const allowance = (await publicClient.readContract({
        address: linkAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, senderAddress],
      })) as bigint;
      const fee = (await publicClient.readContract({
        address: senderAddress,
        abi: senderAbi,
        functionName: "feeFor",
        args: [
          chainlinkMumbaiSelector,
          newRecipient,
          encodeAbiParameters(parseAbiParameters("address,address,uint,bytes"), [
            "0x1cC86b9b67C93B8Fa411554DB761f68979E7995A",
            "0xc8c0Cf9436F4862a8F60Ce680Ca5a9f0f99b5ded",
            1n,
            paraswap,
          ]),
          ccipAddress,
          parseUnits(newAmount, tokenDecimals),
          linkAddress,
        ],
      })) as bigint;

      setFee(fee);
      setNeedsLinkApproval(allowance < fee);
    } catch (error) {
      console.error("Failed to check allowance:", error);
    }
  };

  useEffect(() => {
    checkAllowance();
    checkLinkAllowance();
    setEnabled(chain?.id === 11155111);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAmount, newRecipient, chain]);

  const writeAsync = async () => {
    try {
      setLoading(true);
      const result = await walletClient?.writeContract({
        address: senderAddress,
        abi: senderAbi,
        functionName: "sendMessagePayLINK",
        args: [
          chainlinkMumbaiSelector,
          newRecipient,
          encodeAbiParameters(parseAbiParameters("address,address,uint,bytes"), [
            "0x1cC86b9b67C93B8Fa411554DB761f68979E7995A",
            "0xc8c0Cf9436F4862a8F60Ce680Ca5a9f0f99b5ded",
            1n,
            paraswap,
          ]),
          ccipAddress,
          parseUnits(newAmount, tokenDecimals),
        ],
      });
      console.log("Transfer successful:", result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Transfer failed:", error);
    }
  };
  // const { writeAsync, isLoading } = useScaffoldContractWrite({
  //   contractName: "Bridge",
  //   functionName: "sendCrossChainDeposit",
  //   args: [
  //     wormholeChainId,
  //     targetBridge,
  //     newRecipient,
  //     parseUnits(newAmount, tokenDecimals),
  //     tokenAddress,
  //     destinationTokens[tokenAddress],
  //   ],
  //   value: estimatedGas,
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

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
                This is a sample UI for interacting with Chainlink bridge contracts.
                <strong>Limited from Ethereum Sepolia to Polygon Mumbai for now.</strong>
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
          <span className="text-lighten mt-2">CCIP from Ethereum Sepolia to DAI on Polygon Mumbai</span>

          <div className="mt-6">
            <div className="mt-4">
              <AddressInput
                placeholder="Input recipient address (on target chain)"
                value={newRecipient}
                onChange={setNewRecipient}
              />
            </div>
            <div className="mt-4">
              <InputBase placeholder="Amount of CCIP to transfer" value={newAmount} onChange={setNewAmount} />
            </div>
            <div className="flex rounded-full p-1 flex-shrink-0 mt-5">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={async () => {
                    if (needsApproval) {
                      if (needsLinkApproval) {
                        await approveLinkAsync();
                      } else {
                        // Assume approveAsync is a function you've defined to handle the approval transaction
                        await approveAsync();
                      }
                    } else {
                      await writeAsync();
                      await checkAllowance();
                      await checkLinkAllowance();
                    }
                  }}
                  disabled={!enabled || loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : needsApproval ? (
                    needsLinkApproval ? (
                      "Approve LINK"
                    ) : (
                      "Approve"
                    )
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
            <div className="badge badge-warning">{formatUnits(BigInt(fee || "0"), 18)} LINK + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
