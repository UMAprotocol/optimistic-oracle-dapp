import ethereumLogo from "assets/ethereum-logo.svg";
import polygonLogo from "assets/polygon-tag.svg";
import bobaLogo from "assets/boba-logo.svg";

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
  KOVAN = 42,
  POLYGON = 137,
  BOBA = 288,
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
  [ChainId.KOVAN]: {
    name: "Kovan Ethereum",
    chainId: ChainId.KOVAN,
    logoURI: ethereumLogo,
    explorerUrl: "https://kovan.etherscan.io",
    constructExplorerLink: (txHash: string) =>
      `https://kovan.etherscan.io/tx/${txHash}`,
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
  [ChainId.BOBA]: {
    name: "Boba",
    chainId: ChainId.BOBA,
    logoURI: bobaLogo,
    explorerUrl: "https://blockexplorer.boba.network/",
    constructExplorerLink: (txHash: string) =>
      `https://blockexplorer.boba.network/tx/${txHash}`,
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

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
