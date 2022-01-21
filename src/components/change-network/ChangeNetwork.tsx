import { FC } from "react";
import StickyHeader from "components/sticky-header";
import { ChainId, CHAINS } from "constants/blockchain";
import { Wrapper } from "./ChangeNetwork.styled";
import useClient from 'hooks/useOracleClient'

interface Props {
  switchChain: ()=>void;
  chainId: ChainId;
}

const ChangeNetwork: FC<Props> = ({ switchChain, chainId }) => {
  const {client} = useClient()
  return (
    <StickyHeader>
      <Wrapper>
        You are on an incorrect network. Please{" "}
        <button onClick={switchChain}>
          switch to {CHAINS[chainId].name}
        </button>
      </Wrapper>
    </StickyHeader>
  );
};

export default ChangeNetwork;
