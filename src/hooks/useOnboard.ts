import React from "react";
import { useConnection } from "./useConnection";

export function useOnboard() {
  const { connect, disconnect, setError, instance } = useConnection();

  const initOnboard = React.useCallback(async () => {
    try {
      await instance.walletSelect();
      await instance.walletCheck();
      connect({ connector: instance });
    } catch (err: any) {
      setError(err);
    }
  }, [connect, instance, setError]);
  const resetOnboard = React.useCallback(() => {
    instance.walletReset();
    disconnect();
  }, [instance, disconnect]);
  return { initOnboard, resetOnboard };
}
