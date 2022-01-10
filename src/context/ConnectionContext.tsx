import React from "react";
import { ethers } from "ethers";
import {
  Wallet,
  Initialization,
  API as OnboardAPI,
} from "bnc-onboard/dist/src/interfaces";
import Onboard from "bnc-onboard";

enum ActionType {
  CONNECT,
  DISCONNECT,
  UPDATE,
  UPDATE_FROM_ERROR,
  ERROR,
}
type ConnectionManagerState = {
  provider?: any;
  account?: string;
  connector?: any;
  chainId?: number;
  error?: Error;
};
type Action =
  | {
      type: ActionType.CONNECT;
      payload: ConnectionManagerState;
    }
  | {
      type: ActionType.DISCONNECT;
    }
  | {
      type: ActionType.UPDATE | ActionType.UPDATE_FROM_ERROR;
      payload: ConnectionManagerState;
    }
  | {
      type: ActionType.ERROR;
      payload: Pick<ConnectionManagerState, "error">;
    };

function reducer(
  state: ConnectionManagerState,
  action: Action
): ConnectionManagerState {
  switch (action.type) {
    case ActionType.CONNECT: {
      return { ...state, ...action.payload };
    }
    case ActionType.DISCONNECT: {
      return {};
    }
    case ActionType.ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }
    case ActionType.UPDATE: {
      const { provider, account, chainId, connector } = action.payload;
      return {
        ...state,
        ...(provider ? { provider } : {}),
        ...(account ? { account } : {}),
        ...(chainId ? { chainId } : {}),
        ...(connector ? { connector } : {}),
      };
    }
    case ActionType.UPDATE_FROM_ERROR: {
      const { provider, account, chainId, connector } = action.payload;
      return {
        ...state,
        ...(provider ? { provider } : {}),
        ...(account ? { account } : {}),
        ...(chainId ? { chainId } : {}),
        ...(connector ? { connector } : {}),
        error: undefined,
      };
    }
  }
}

function onboardBaseConfig(_chainId?: number): Initialization {
  return {
    dappId: process.env.REACT_APP_ONBOARD_API_KEY || "",
    hideBranding: true,
    networkId: 1, // Default to main net. If on a different network will change with the subscription.
    walletSelect: {
      wallets: [{ walletName: "metamask", preferred: true }],
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

type ConnectionState = {
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  connect: (payload: ConnectionManagerState) => void;
  disconnect: () => void;
  update: (update: ConnectionManagerState) => void;
  setError: (error: Error) => void;
  isConnected: boolean;
  instance: OnboardAPI;
} & Omit<ConnectionManagerState, "provider">;

export const ConnectionContext = React.createContext<
  undefined | ConnectionState
>(undefined);
ConnectionContext.displayName = "ConnectionContext";

export const ConnectionProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  const { provider, account, chainId, connector, error } = state;

  const connect = React.useCallback((payload: ConnectionManagerState) => {
    dispatch({
      type: ActionType.CONNECT,
      payload,
    });
  }, []);
  const disconnect = React.useCallback(() => {
    dispatch({ type: ActionType.DISCONNECT });
  }, []);
  const setError = React.useCallback((error: Error) => {
    dispatch({ type: ActionType.ERROR, payload: { error } });
  }, []);
  const update = React.useCallback(
    (update: ConnectionManagerState) => {
      if (error) {
        dispatch({
          type: ActionType.UPDATE_FROM_ERROR,
          payload: { ...update },
        });
        return;
      }

      dispatch({ type: ActionType.UPDATE, payload: { ...update } });
    },
    [error]
  );

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
    [update]
  );

  const isConnected = provider != null && chainId != null && account != null;
  const wrappedProvider = provider
    ? new ethers.providers.Web3Provider(provider)
    : undefined;
  const signer = wrappedProvider ? wrappedProvider.getSigner() : undefined;

  const value: ConnectionState = {
    provider: wrappedProvider,
    signer,
    account,
    chainId,
    connector,
    error,

    connect,
    disconnect,
    update,
    setError,
    instance,
    isConnected,
  };

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
};
