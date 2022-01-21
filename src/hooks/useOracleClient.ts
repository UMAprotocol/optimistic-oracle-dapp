import React from "react";
import { Context } from "context/OracleClientContext";

function useContext() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      "useOracleClient must be used within a <OracleClientProvider>"
    );
  }

  return context;
}

export default useContext;
