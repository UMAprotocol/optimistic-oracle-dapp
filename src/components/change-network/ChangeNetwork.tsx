import { FC } from "react";
import { ethers } from "ethers";
import StickyHeader from "components/sticky-header";
import { switchChain } from "helpers/switchChain";
import { ChainId, CHAINS } from "helpers/switchChain";

interface Props {
  provider: ethers.providers.Web3Provider;
  chainId: ChainId;
}
const ChangeNetwork: FC<Props> = ({ provider, chainId }) => {
  return (
    <StickyHeader>
      <div>
        You are on an incorrect network. Please{" "}
        <button onClick={() => switchChain(provider, chainId)}>
          switch to {CHAINS[chainId].name}
        </button>
      </div>
    </StickyHeader>
  );
};

export default ChangeNetwork;
