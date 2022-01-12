import ethereumLogo from "assets/ethereum-logo.svg";
import polygonLogo from "assets/UMA-OO-Polygon-tag.svg";

export enum ChainId {
  MAINNET = 1,
  POLYGON = 137,
}

// Based on EIP, for adding into MM
// https://eips.ethereum.org/EIPS/eip-3085
type ChainMetadata = {
  name: string;
  chainId: ChainId;
  logoURI: string;
  rpcUrl?: string;
  explorerUrl: string;
  constructExplorerLink: (txHash: string) => string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
};

export const CHAINS: Record<ChainId, ChainMetadata> = {
  [ChainId.MAINNET]: {
    name: "Ethereum Mainnet",
    chainId: ChainId.MAINNET,
    logoURI: ethereumLogo,
    explorerUrl: "https://etherscan.io",
    constructExplorerLink: (txHash: string) =>
      `https://etherscan.io/tx/${txHash}`,
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  [ChainId.POLYGON]: {
    name: "Polygon Mainnet",
    chainId: ChainId.POLYGON,
    logoURI: polygonLogo,
    rpcUrl: "https://polygon-rpc.com/",
    explorerUrl: "https://polygonscan.com/",
    constructExplorerLink: (txHash: string) =>
      `https://polygonscan.com/tx/${txHash}`,
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
  },
};