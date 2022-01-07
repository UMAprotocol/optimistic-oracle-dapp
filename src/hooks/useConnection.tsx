import React from "react";
import { ConnectionContext } from "context/ConnectionContext";

export function useConnection() {
  const context = React.useContext(ConnectionContext);
  if (!context) {
    throw new Error("UseConnection must be used within a <ConnectionProvider>");
  }

  return context;
}
