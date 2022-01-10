import React from "react";
import { useConnection } from "./useConnection";

export function useOnboard() {
  const { connect, disconnect, setError, instance } = useConnection();

  const connectWallet = React.useCallback(async () => {
    try {
      await instance.walletSelect();
      await instance.walletCheck();
      connect({ connector: instance });
    } catch (err: any) {
      setError(err);
    }
  }, [connect, instance, setError]);
  const resetWallet = React.useCallback(() => {
    instance.walletReset();
    disconnect();
  }, [instance, disconnect]);
  return { connectWallet, resetWallet };
}
