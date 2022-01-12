import { createContext, FC } from "react";
import { oracle } from "@uma/sdk";
import config from "constants/oracleConfig";

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
