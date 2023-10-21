import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
// import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteractionChainlink } from "~~/components/example-ui/ContractInteractionChainlink";
import { ContractInteractionWormhole } from "~~/components/example-ui/ContractInteractionWormhole";

const ExampleUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="dCustody Bridge Adapter"
        description="Example UI for interacting with the dCustody Bridge Adapter."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <ContractInteractionWormhole />
        <ContractInteractionChainlink />
      </div>
    </>
  );
};

export default ExampleUI;
