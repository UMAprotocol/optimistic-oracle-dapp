import { oracle } from "@uma/sdk";
import { CHAINS, ChainId } from "./blockchain";

// metamask local chain for testing
const mmChainId = ChainId.MM_TESTNET;
// Ethereum config
const ethChainId = ChainId.MAINNET;
// Polygon config
const polygonChainId = ChainId.POLYGON;
const kovanChainId = ChainId.KOVAN;
const bobaChainId = ChainId.BOBA;

const optimisticChains: Record<number, oracle.types.state.PartialChainConfig> =
  {};
const skinnyChains: Record<number, oracle.types.state.PartialChainConfig> = {};

// enable local node if debug is on
if (process.env.REACT_APP_DEBUG) {
  optimisticChains[mmChainId] = {
    rpcUrls: ["http://127.0.0.1:8545"],
    nativeCurrency: CHAINS[ethChainId].nativeCurrency,
    blockExplorerUrls: [CHAINS[ethChainId].explorerUrl],
    chainName: CHAINS[ethChainId].name,
    multicall2Address: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    optimisticOracleAddress: "0xC43767F4592DF265B4a9F1a398B97fF24F38C6A6",
  };
}

if (process.env.REACT_APP_PROVIDER_URL_1) {
  const chainConfig: oracle.types.state.PartialChainConfig = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_1],
    nativeCurrency: CHAINS[ethChainId].nativeCurrency,
    chainName: CHAINS[ethChainId].name,
    blockExplorerUrls: [CHAINS[ethChainId].explorerUrl],
  };
  optimisticChains[ethChainId] = chainConfig;
  skinnyChains[ethChainId] = chainConfig;
}

if (process.env.REACT_APP_PROVIDER_URL_137) {
  optimisticChains[polygonChainId] = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_137],
    nativeCurrency: CHAINS[polygonChainId].nativeCurrency,
    chainName: CHAINS[polygonChainId].name,
    blockExplorerUrls: [CHAINS[polygonChainId].explorerUrl],
    // polygon mainnet does not have requests before this block
    earliestBlockNumber: 20000000,
    // this value was selected with testing to give a balance between quantity of requests found vs how fast the latest
    // requests show removing this will enable the client to query the full range in one request.
    maxEventRangeQuery: 200000,
  };
}

if (process.env.REACT_APP_PROVIDER_URL_42) {
  optimisticChains[kovanChainId] = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_42],
    nativeCurrency: CHAINS[kovanChainId].nativeCurrency,
    chainName: CHAINS[kovanChainId].name,
    blockExplorerUrls: [CHAINS[kovanChainId].explorerUrl],
  };
}

if (process.env.REACT_APP_PROVIDER_URL_288) {
  optimisticChains[bobaChainId] = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_288],
    nativeCurrency: CHAINS[bobaChainId].nativeCurrency,
    chainName: CHAINS[bobaChainId].name,
    blockExplorerUrls: [CHAINS[bobaChainId].explorerUrl],
  };
}

// order of export is important, this determines the order in which clients are returned from factory
const config: [
  oracle.types.state.OracleType,
  oracle.types.state.PartialConfig
][] = [
  [oracle.types.state.OracleType.Optimistic, { chains: optimisticChains }],
  [oracle.types.state.OracleType.Skinny, { chains: skinnyChains }],
];
export default config;
