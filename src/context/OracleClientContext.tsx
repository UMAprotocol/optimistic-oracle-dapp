import React, { useEffect, useState } from "react";
import { events, oracle, clients, mapObject } from "helpers/oracleClient";

type States = {
  [key in oracle.types.state.OracleType]?: oracle.types.state.State;
};

export type ContextState = {
  oracle: typeof oracle;
  events: typeof events;
  states: States;
  clients: oracle.types.interfaces.ClientTable;
};

export const Context = React.createContext<ContextState>({
  states: {},
  clients: clients,
} as ContextState);

Context.displayName = "OracleClientContext";

export const OracleClientProvider: React.FC = ({ children }) => {
  const [states, setStates] = useState<States>(
    mapObject((client) => client.store.get())
  );

  useEffect(() => {
    function eventHandler(
      oracleType: oracle.types.state.OracleType,
      state: oracle.types.state.State
    ) {
      setStates((prev) => {
        return { ...prev, [oracleType]: state };
      });
    }
    events.on("change", eventHandler);
    return () => {
      events.removeListener("change", eventHandler);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        states,
        oracle,
        events,
        clients,
      }}
    >
      {children}
    </Context.Provider>
  );
};
