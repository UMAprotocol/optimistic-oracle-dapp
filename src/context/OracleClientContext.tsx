import React, { useEffect, useState } from "react";
import { events, oracle, client } from "helpers/oracleClient";

export type State = {
  state: oracle.types.state.State;
  oracle: typeof oracle;
  client: typeof client;
  events: typeof events;
  read: typeof client.store.read;
  flags: Record<oracle.types.state.Flag, boolean>;
};

export const Context = React.createContext<State>({} as State);

Context.displayName = "OracleClientContext";

export const OracleClientProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<State["state"]>(client.store.get());

  useEffect(() => {
    events.on("change", setState);
    return () => {
      events.removeListener("change", setState);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        state,
        oracle,
        events,
        client,
        read: client.store.read,
        flags: oracle.utils.getFlags(state),
      }}
    >
      {children}
    </Context.Provider>
  );
};
