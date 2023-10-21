// import { useState } from "react";
// import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead, // useScaffoldEventHistory,
  // useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

// const MARQUEE_PERIOD_IN_SEC = 5;

export const ContractData = () => {
  // const { address } = useAccount();

  const { data: swapper } = useScaffoldContractRead({
    contractName: "Bridge",
    functionName: "swapper",
  });

  // useScaffoldEventSubscriber({
  //   contractName: "YourContract",
  //   eventName: "GreetingChange",
  //   listener: logs => {
  //     logs.map(log => {
  //       const { greetingSetter, value, premium, newGreeting } = log.args;
  //       console.log("📡 GreetingChange event", greetingSetter, value, premium, newGreeting);
  //     });
  //   },
  // });

  // const {
  //   data: myGreetingChangeEvents,
  //   isLoading: isLoadingEvents,
  //   error: errorReadingEvents,
  // } = useScaffoldEventHistory({
  //   contractName: "YourContract",
  //   eventName: "GreetingChange",
  //   fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
  //   filters: { greetingSetter: address },
  //   blockData: true,
  // });

  // console.log("Events:", isLoadingEvents, errorReadingEvents, myGreetingChangeEvents);

  const { data: bridge } = useScaffoldContract({ contractName: "Bridge" });
  console.log("bridge: ", bridge);

  const { showAnimation } = useAnimationConfig(swapper);

  return (
    <div className="flex flex-col justify-center items-center py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
          showAnimation ? "animate-zoom" : ""
        }`}
      >
        <div className="flex justify-between w-full">
          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Swapper</div>
            <div className="text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {swapper?.toString() || "0x0"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
