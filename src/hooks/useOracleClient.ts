import React from "react";
import assert from "assert";
import { Context } from "context/OracleClientContext";
import { oracle, defaultOracleType } from "helpers/oracleClient";
import { useRequestInputRequired } from "hooks/useRequestParams";

function useOracleClient(oracleTypeOverride?: oracle.types.state.OracleType) {
  const context = React.useContext(Context);
  assert(
    context,
    "useOracleClient must be used within a <OracleClientProvider>"
  );

  const requestQuery = useRequestInputRequired();

  const oracleType =
    oracleTypeOverride || requestQuery?.oracleType || defaultOracleType;
  const client = context.clients[oracleType];
  assert(client, "no client for oracle type: " + oracleType);

  const state = context.states[oracleType];
  assert(state, "no state for oracle type: " + oracleType);

  const flags = context.oracle.utils.getFlags(state);

  return {
    oracleType,
    client,
    state,
    flags,
  };
}

export default useOracleClient;
