import { oracle } from "@uma/sdk";
import { CHAINS, ChainId } from "./blockchain";

// Ethereum config
const ethChainId = ChainId.MAINNET;
const ethChainConfig: oracle.types.state.PartialChainConfig = {
  rpcUrls: [process.env.REACT_APP_PROVIDER_URL_1 ?? ""],
  nativeCurrency: CHAINS[ethChainId].nativeCurrency,
  chainName: CHAINS[ethChainId].name,
  blockExplorerUrls: [CHAINS[ethChainId].explorerUrl],
};

// Polygon config
const polygonChainId = ChainId.POLYGON;
const polygonChainConfig: oracle.types.state.PartialChainConfig = {
  rpcUrls: [process.env.REACT_APP_PROVIDER_URL_137 ?? ""],
  nativeCurrency: CHAINS[polygonChainId].nativeCurrency,
  chainName: CHAINS[polygonChainId].name,
  blockExplorerUrls: [CHAINS[polygonChainId].explorerUrl],
};

// Default Hardhat config
const hardhatChainId = 31337;
const hardhatChainConfig: oracle.types.state.PartialChainConfig = {
  chainId: hardhatChainId,
  nativeCurrency: CHAINS[ethChainId].nativeCurrency,
  blockExplorerUrls: [CHAINS[ethChainId].explorerUrl],
  chainName: CHAINS[ethChainId].name,
  multicall2Address: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
  optimisticOracleAddress: "0xC43767F4592DF265B4a9F1a398B97fF24F38C6A6",
  rpcUrls: ["http://127.0.0.1:8545"],
};

// MM defaults to 1337.
const mmChainId = 1337;

const config = {
  chains: {
    [ethChainId]: ethChainConfig,
    [polygonChainId]: polygonChainConfig,
    [hardhatChainId]: hardhatChainConfig,
    [mmChainId]: hardhatChainConfig,
  },
};

export default config;
