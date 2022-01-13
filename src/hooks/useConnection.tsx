import React from "react";
import { ConnectionContext } from "context/ConnectionContext";

function useConnection() {
  const context = React.useContext(ConnectionContext);
  if (!context) {
    throw new Error("UseConnection must be used within a <ConnectionProvider>");
  }

  return context;
}

export default useConnection;
