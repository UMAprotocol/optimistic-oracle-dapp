import { createContext, FC } from "react";
import { oracle } from "@uma/sdk";

const multicall2Address = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696";
const optimisticOracleAddress = "0xC43767F4592DF265B4a9F1a398B97fF24F38C6A6";
const chainId = 1;
const providerUrl = process.env.REACT_APP_CUSTOM_NODE_URL ?? "";

export const config = {
  chains: {
    [chainId]: {
      chainId,
      multicall2Address,
      optimisticOracleAddress,
      providerUrl,
    },
  },
};

const client = oracle.client.factory(config, () => undefined);

export const RequestClientContext = createContext<oracle.client.Client>(client);

RequestClientContext.displayName = "RequestClientContext";

export const RequestClientProvider: FC = ({ children }) => {
  return (
    <RequestClientContext.Provider value={client}>
      {children}
    </RequestClientContext.Provider>
  );
};

export default RequestClientContext;
