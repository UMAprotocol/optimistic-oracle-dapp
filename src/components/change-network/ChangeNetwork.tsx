import { FC } from "react";
import { ethers } from "ethers";
import StickyHeader from "components/sticky-header";
import { switchChain } from "helpers/switchChain";
import { ChainId, CHAINS } from "constants/blockchain";
import { Wrapper } from "./ChangeNetwork.styled";

interface Props {
  provider: ethers.providers.Web3Provider;
  chainId: ChainId;
}

const ChangeNetwork: FC<Props> = ({ provider, chainId }) => {
  return (
    <StickyHeader>
      <Wrapper>
        You are on an incorrect network. Please{" "}
        <button onClick={() => switchChain(provider, chainId)}>
          switch to {CHAINS[chainId].name}
        </button>
      </Wrapper>
    </StickyHeader>
  );
};

export default ChangeNetwork;
