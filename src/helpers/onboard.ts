import Onboard from "bnc-onboard";
import { ethers } from 'ethers'
import { client, oracle } from './oracleClient'
import onboardBaseConfig from "./onboardBaseConfig";
import { Wallet } from "bnc-onboard/dist/src/interfaces";

export const onboard = Onboard({
  ...onboardBaseConfig(),
  subscriptions: {
    address: (address: string) => {
      if(address) client.setUser({address:ethers.utils.getAddress(address)})
    },
    network: (networkId: number) => {
      if(networkId) client.setUser({chainId:networkId})
    },
    wallet: async (wallet: Wallet) => {
      if (wallet.provider) {
        const provider = new ethers.providers.Web3Provider(wallet.provider) as oracle.types.ethers.Web3Provider;
        client.setUser({signer:provider.getSigner(),provider})
      }
    }
  }
})

export const connect = async ()=>{
  try{
    await onboard.walletSelect();
    // await onboard.walletCheck();
  }catch(err){
    console.log(err)
  }
}
export const disconnect = ()=>{
  onboard.walletReset();
  client.clearUser()
}
