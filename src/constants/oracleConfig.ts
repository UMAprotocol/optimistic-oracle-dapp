import { oracle } from "@uma/sdk";
import { CHAINS, ChainId } from "./blockchain";

const optimisticChains: Record<number, oracle.types.state.PartialChainConfig> =
  {};
const skinnyChains: Record<number, oracle.types.state.PartialChainConfig> = {};

const optimisticV2Chains: Record<
  number,
  oracle.types.state.PartialChainConfig
> = {};

export const ChainsEnabled: { label: string; value: string }[] = [];
// typescript doesnt believe that [string] is compatible with [string, ...string[]], so we have to cast some parts of our config
type RequiredStringList = [string, ...string[]];

// enable local node if debug is on, this only works as a fork of mainnet
if (process.env.REACT_APP_FORK_1) {
  const chainId = ChainId.MM_TESTNET;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: ["http://127.0.0.1:8545"] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
    chainName: chain.name,
  };
  optimisticChains[chainId] = {
    ...config,
    multicall2Address: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    optimisticOracleAddress: "0xC43767F4592DF265B4a9F1a398B97fF24F38C6A6",
  };
  skinnyChains[chainId] = {
    ...config,
    multicall2Address: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    optimisticOracleAddress: "0xeE3Afe347D5C74317041E2618C49534dAf887c24",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    multicall2Address: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    optimisticOracleAddress: "0xA0Ae6609447e57a42c51B50EAe921D701823FFAe",
  };
}

if (process.env.REACT_APP_PROVIDER_URL_1) {
  const chainId = ChainId.MAINNET;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_1] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xc43767f4592df265b4a9f1a398b97ff24f38c6a6",
  };
  skinnyChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xeE3Afe347D5C74317041E2618C49534dAf887c24",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xA0Ae6609447e57a42c51B50EAe921D701823FFAe",
  };
}

if (process.env.REACT_APP_PROVIDER_URL_5) {
  const chainId = ChainId.GOERLI;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_5] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny deployment on goerli
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x6f26Bf09B1C792e3228e5467807a900A503c0281",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xA5B9d8a0B0Fa04Ba71BDD68069661ED5C0848884",
  };
}

if (process.env.REACT_APP_PROVIDER_URL_10) {
  const chainId = ChainId.OPTIMISM;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_10] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny deployment on this chain
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x56e2d1b8C7dE8D11B282E1b4C924C32D91f9102B",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x255483434aba5a75dc60c1391bB162BCd9DE2882",
  };
}
if (process.env.REACT_APP_PROVIDER_URL_82) {
  const chainId = ChainId.METER;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_82] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny deployment on this chain
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xd8343E437B946D40e4C53ce1e6fF39F64F334C36",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x31C222e0D862827137ab5D4e8EE30c41Cc915a96",
  };
}
if (process.env.REACT_APP_PROVIDER_URL_100) {
  const chainId = ChainId.XDAI;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_100] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny or v2 deployment on this chain
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xd2ecb3afe598b746F8123CaE365a598DA831A449",
  };
}
if (process.env.REACT_APP_PROVIDER_URL_137) {
  const chainId = ChainId.POLYGON;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_137] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny deployment on this chain
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xBb1A8db2D4350976a11cdfA60A1d43f97710Da49",
    // polygon mainnet does not have requests before this block
    earliestBlockNumber: 20000000,
    // this value was selected with testing to give a balance between quantity of requests found vs how fast the latest
    // requests show removing this will enable the client to query the full range in one request.
    maxEventRangeQuery: 200000,
  };

  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xee3afe347d5c74317041e2618c49534daf887c24",
    earliestBlockNumber: 30900000,
    maxEventRangeQuery: 200000,
  };
}

if (process.env.REACT_APP_PROVIDER_URL_288) {
  const chainId = ChainId.BOBA;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_288] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny deployment
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x7da554228555C8Bf3748403573d48a2138C6b848",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xb2b5C1b17B19d92CC4fC1f026B2133259e3ccd41",
  };
}

if (process.env.REACT_APP_PROVIDER_URL_416) {
  const chainId = ChainId.SX;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_416] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny deployment
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x273CAC5468b7c50B9ab2ce598693c5f441750CC4",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x28077B47Cd03326De7838926A63699849DD4fa87",
  };
}
if (process.env.REACT_APP_PROVIDER_URL_9001) {
  const chainId = ChainId.EVMOS;
  const chain = CHAINS[chainId];
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_9001] as RequiredStringList,
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny deployment
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xd2ecb3afe598b746F8123CaE365a598DA831A449",
  };
}
if (process.env.REACT_APP_PROVIDER_URL_42161) {
  const chainId = ChainId.ARBITRUM;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_42161] as [
      string,
      ...string[]
    ],
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny deployment
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x031A7882cE3e8b4462b057EBb0c3F23Cd731D234",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x88Ad27C41AD06f01153E7Cd9b10cBEdF4616f4d5",
  };
}
if (process.env.REACT_APP_PROVIDER_URL_43114) {
  const chainId = ChainId.AVAX;
  const chain = CHAINS[chainId];
  ChainsEnabled.push({ label: chain.name, value: chainId.toString() });
  const config = {
    rpcUrls: [process.env.REACT_APP_PROVIDER_URL_43114] as [
      string,
      ...string[]
    ],
    nativeCurrency: chain.nativeCurrency,
    chainName: chain.name,
    blockExplorerUrls: [chain.explorerUrl] as RequiredStringList,
  };
  // no skinny deployment
  optimisticChains[chainId] = {
    ...config,
    optimisticOracleAddress: "0xB0D89D3218374BD8FE60f5748a880e9E373fB818",
  };
  optimisticV2Chains[chainId] = {
    ...config,
    optimisticOracleAddress: "0x28077B47Cd03326De7838926A63699849DD4fa87",
  };
}

// order of export is important, this determines the order in which clients are returned from factory
const config: [
  oracle.types.state.OracleType,
  oracle.types.state.PartialConfig
][] = [
  [oracle.types.state.OracleType.Optimistic, { chains: optimisticChains }],
  [oracle.types.state.OracleType.Skinny, { chains: skinnyChains }],
  [oracle.types.state.OracleType.OptimisticV2, { chains: optimisticV2Chains }],
];
export default config;
