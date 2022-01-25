import useOracleClient from "hooks/useOracleClient";
import { disconnect, connect } from "helpers/onboard";

function useConnection() {
  const { state, flags } = useOracleClient();
  return {
    connect,
    disconnect,
    signer: state?.inputs?.user?.signer,
    account: state?.inputs?.user?.address,
    chainId: state?.inputs?.user?.chainId,
    provider: state?.inputs?.user?.provider,
    isConnected: !flags?.MissingUser,
    wrongNetwork: flags?.WrongChain,
  };
}

export default useConnection;
