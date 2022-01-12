interface ChainConfig {
  chainId: number;
  multicall2Address?: string;
  optimisticOracleAddress: string;
  providerUrl: string;
}

// Ethereum config
const ethChainId = 1;
const ethChainConfig: ChainConfig = {
  chainId: ethChainId,
  multicall2Address: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
  optimisticOracleAddress: "0xC43767F4592DF265B4a9F1a398B97fF24F38C6A6",
  providerUrl: process.env.REACT_APP_PROVIDER_URL_1 ?? "",
};

// Polygon config
const polygonChainId = 137;
const polygonChainConfig: ChainConfig = {
  chainId: polygonChainId,
  optimisticOracleAddress: "0xBb1A8db2D4350976a11cdfA60A1d43f97710Da49",
  providerUrl: process.env.REACT_APP_PROVIDER_URL_137 ?? "",
};

const config = {
  chains: {
    [ethChainId]: ethChainConfig,
    [polygonChainId]: polygonChainConfig,
  },
};

export default config;
