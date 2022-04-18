import { oracle } from "@uma/sdk";
import { CHAINS, ChainId } from "./blockchain";

// metamask local chain for testing
const mmChainId = ChainId.MM_TESTNET;
// Ethereum config
const ethChainId = ChainId.MAINNET;
// Polygon config
const polygonChainId = ChainId.POLYGON;
const kovanChainId = ChainId.KOVAN;

const chains: Record<number, oracle.types.state.PartialChainConfig> = {};

// enable local node if debug is on
if (process.env.REACT_APP_DEBUG) {
  chains[mmChainId] = {
    rpcUrls: ["http://127.0.0.1:8545"],
    nativeCurrency: CHAINS[ethChainId].nativeCurrency,
    blockExplorerUrls: [CHAINS[ethChainId].explorerUrl],
    chainName: CHAINS[ethChainId].name,
    multicall2Address: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    optimisticOracleAddress: "0xC43767F4592DF265B4a9F1a398B97fF24F38C6A6",
  };
}

if (process.env.REACT_APP_PROVIDER_URL_1) {
  chains[ethChainId] = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_1],
    nativeCurrency: CHAINS[ethChainId].nativeCurrency,
    chainName: CHAINS[ethChainId].name,
    blockExplorerUrls: [CHAINS[ethChainId].explorerUrl],
  };
}

if (process.env.REACT_APP_PROVIDER_URL_137) {
  chains[polygonChainId] = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_137],
    nativeCurrency: CHAINS[polygonChainId].nativeCurrency,
    chainName: CHAINS[polygonChainId].name,
    blockExplorerUrls: [CHAINS[polygonChainId].explorerUrl],
  };
}
if (process.env.REACT_APP_PROVIDER_URL_42) {
  chains[kovanChainId] = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_42],
    nativeCurrency: CHAINS[kovanChainId].nativeCurrency,
    chainName: CHAINS[kovanChainId].name,
    blockExplorerUrls: [CHAINS[kovanChainId].explorerUrl],
  };
}

export default { chains };
