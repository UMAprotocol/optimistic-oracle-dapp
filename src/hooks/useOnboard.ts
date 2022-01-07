import React from "react";
import { Wallet } from "bnc-onboard/dist/src/interfaces";
import Onboard from "bnc-onboard";
import { Initialization } from "bnc-onboard/dist/src/interfaces";

import { useConnection } from "./useConnection";

const infuraId =
  process.env.NEXT_PUBLIC_INFURA_ID || "d5e29c9b9a9d4116a7348113f57770a8";

const getNetworkName = (chainId: number) => {
  switch (chainId) {
    case 1: {
      return "mainnet";
    }
    case 42: {
      return "kovan";
    }
    case 3: {
      return "ropsten";
    }
    case 4: {
      return "rinkeby";
    }
  }
};

function onboardBaseConfig(_chainId?: number): Initialization {
  const chainId = _chainId ?? 1;
  const infuraRpc = `https://${getNetworkName(
    chainId
  )}.infura.io/v3/${infuraId}`;

  return {
    dappId: process.env.NEXT_PUBLIC_ONBOARD_API_KEY || "",
    hideBranding: true,
    networkId: 1, // Default to main net. If on a different network will change with the subscription.
    walletSelect: {
      wallets: [
        { walletName: "metamask", preferred: true },
        {
          walletName: "imToken",
          rpcUrl:
            chainId === 1
              ? "https://mainnet-eth.token.im"
              : "https://eth-testnet.tokenlon.im",
          preferred: true,
        },
        { walletName: "coinbase", preferred: true },
        {
          walletName: "portis",
          apiKey: process.env.NEXT_PUBLIC_PORTIS_API_KEY,
        },
        { walletName: "trust", rpcUrl: infuraRpc },
        { walletName: "dapper" },
        {
          walletName: "walletConnect",
          rpc: { [chainId || 1]: infuraRpc },
        },
        { walletName: "gnosis" },
        { walletName: "walletLink", rpcUrl: infuraRpc },
        { walletName: "opera" },
        { walletName: "operaTouch" },
        { walletName: "torus" },
        { walletName: "status" },
        { walletName: "unilogin" },
        {
          walletName: "ledger",
          rpcUrl: infuraRpc,
        },
      ],
    },
    walletCheck: [
      { checkName: "connect" },
      { checkName: "accounts" },
      { checkName: "network" },
      { checkName: "balance", minimumBalance: "0" },
    ],
    // To prevent providers from requesting block numbers every 4 seconds (see https://github.com/WalletConnect/walletconnect-monorepo/issues/357)
    blockPollingInterval: 1000 * 60 * 60,
  };
}

export function useOnboard() {
  const { connect, disconnect, update, setError } = useConnection();
  const instance = React.useMemo(
    () =>
      Onboard({
        ...onboardBaseConfig(),
        subscriptions: {
          address: (address: string) => {
            update({ account: address });
          },
          network: (networkId: number) => {
            update({
              chainId: networkId,
            });
          },
          wallet: async (wallet: Wallet) => {
            if (wallet.provider) {
              const provider = wallet.provider;

              update({
                provider,
              });
            }
          },
        },
      }),
    [setError, update]
  );
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
