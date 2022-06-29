import Onboard from "bnc-onboard";
import { ethers } from "ethers";
import { oracle, forEach } from "./oracleClient";
import onboardBaseConfig from "./onboardBaseConfig";
import { Wallet } from "bnc-onboard/dist/src/interfaces";

let currentWallet: Wallet | undefined;
const debug = Boolean(process.env.REACT_APP_DEBUG);

export const onboard = Onboard({
  ...onboardBaseConfig(),
  subscriptions: {
    address: (address: string) => {
      debug && console.log("onboard address change", address);
      if (address) {
        forEach((client) => {
          client.setUser({ address: ethers.utils.getAddress(address) });
        });
      } else {
        // address is undefined when metamask wallet is logged out, so run the disconnect routine
        disconnect();
      }
    },
    network: (networkId: number) => {
      debug && console.log("onboard network change", networkId);
      if (!networkId) return;
      const params: Partial<oracle.types.state.User> = {
        chainId: networkId,
      };
      if (currentWallet && currentWallet.provider) {
        params.provider = new ethers.providers.Web3Provider(
          currentWallet.provider
        ) as oracle.types.ethers.Web3Provider;
        params.provider.polling = false;
        params.signer = params.provider.getSigner();
      }
      forEach((client) => {
        client.setUser(params);
      });
    },
    wallet: async (wallet: Wallet) => {
      debug && console.log("onboard wallet change", wallet);
      // turns out this callback is not fired on network changes, meaning provider is out of date in client.
      // so we use network change event to submit the provider and signer to the oracle client.
      currentWallet = wallet;
    },
  },
});

export const connect = async () => {
  try {
    await onboard.walletSelect();
    await onboard.walletCheck();
  } catch (err) {
    console.log(err);
  }
};
export const disconnect = () => {
  onboard.walletReset();
  forEach((client) => {
    client.clearUser();
  });
};
