import React from "react";
import useOracleClient from 'hooks/useOracleClient'
import {disconnect,connect} from 'helpers/onboard'

function useConnection() {
  const {state} = useOracleClient()
  return {
    connect,
    disconnect,
    signer: state?.inputs?.user?.signer,
    account: state?.inputs?.user?.address,
    chainId: state?.inputs?.user?.chainId,
    isConnected: !state?.flags?.['MissingUser'],
    provider: state?.inputs?.user?.provider,
    wrongNetwork: state?.flags?.['WrongChain'], 
  }
}

export default useConnection;
