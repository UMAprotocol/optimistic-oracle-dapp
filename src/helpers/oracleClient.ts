import { oracle } from "@uma/sdk";
import config from "constants/oracleConfig";
import Events from "events";

type OracleType = oracle.types.state.OracleType;
type State = oracle.types.state.State;
type Client = oracle.client.Client;

export const isSupportedOracleType = oracle.utils.isSupportedOracleType;

export { oracle };
export type { OracleType, State, Client };
export const events = new Events();
export const clients = oracle.factory(
  // the configs are an array of oracle configs, the order of the configs determine the order of clients returned
  Object.fromEntries(config),
  (oracleType: OracleType, state: State) =>
    events.emit("change", oracleType, state)
);

// Iterate easily over all clients, useful for duplicating commands on clients
export function forEach(cb: (client: Client) => void): void {
  Object.values(clients).forEach(cb);
}

export function mapObject<V>(cb: (client: Client) => V): {
  [key in OracleType]?: V;
} {
  return Object.fromEntries(
    Object.entries(clients).map(([oracleType, client]) => {
      return [oracleType, cb(client)];
    })
  );
}

export const defaultOracleType: OracleType = config[0][0];

forEach((client) => {
  // setting this to the fastest interval for more responsive state changes
  client.startInterval(1);
});

if (process.env.REACT_APP_DEBUG) {
  events.on("change", (index, state) => {
    console.log("event change", index, state);
  });
}
