import ethereumLogo from "assets/ethereum-logo.svg";
import polygonLogo from "assets/polygon-tag.svg";

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

export enum ChainId {
  MAINNET = 1,
  POLYGON = 137,
  MM_TESTNET = 1337,
  HARDHAT = 31337,
}

export const CHAINS: Record<ChainId, ChainMetadata> = {
  [ChainId.MAINNET]: {
    name: "Ethereum",
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
    name: "Polygon",
    chainId: ChainId.POLYGON,
    logoURI: polygonLogo,
    rpcUrl: "https://polygon-rpc.com/",
    explorerUrl: "https://polygonscan.com",
    constructExplorerLink: (txHash: string) =>
      `https://polygonscan.com/tx/${txHash}`,
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  [ChainId.MM_TESTNET]: {
    name: "MM Testnet",
    chainId: ChainId.MM_TESTNET,
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
  [ChainId.HARDHAT]: {
    name: "Hardhat",
    chainId: ChainId.HARDHAT,
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
};

export enum RequestState {
  Invalid = 0, // Never requested.
  Requested, // 1 Requested, no other actions taken.
  Proposed, // 2 Proposed, but not expired or disputed yet.
  Expired, // 3 Proposed, not disputed, past liveness.
  Disputed, // 4 Disputed, but no DVM price returned yet.
  Resolved, // 5 Disputed and DVM price is available.
  Settled, // 6 Final price has been set in the contract (can get here from Expired or Resolved).
}
