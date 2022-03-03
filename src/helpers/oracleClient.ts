import { oracle } from "@uma/sdk";
import config from "constants/oracleConfig";
import Events from "events";

export { oracle };

export const events = new Events();
export const client = oracle.client.factory(
  config,
  (state: oracle.types.state.State) => events.emit("change", state)
);

// setting this to the fastest interval for more responsive state changes
client.startInterval(1);
if (process.env.REACT_APP_DEBUG) {
  events.on("change", (state) => {
    console.log("event change", state);
  });
}
