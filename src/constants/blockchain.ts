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
  GOERLI = 5,
  OPTIMISM = 10,
  KOVAN = 42,
  METER = 82,
  XDAI = 100,
  POLYGON = 137,
  BOBA = 288,
  SX = 416,
  MM_TESTNET = 1337,
  EVMOS = 9001,
  ARBITRUM = 42161,
  AVAX = 43114,
  HARDHAT = 31337,
}

// useful place to get most of this information: https://chainlist.org/
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
  [ChainId.GOERLI]: {
    name: "Goerli Ethereum",
    chainId: ChainId.GOERLI,
    logoURI: ethereumLogo,
    explorerUrl: "https://goerli.etherscan.io",
    constructExplorerLink: (txHash: string) =>
      `https://goerli.etherscan.io/tx/${txHash}`,
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  [ChainId.OPTIMISM]: {
    name: "Optimism",
    chainId: ChainId.OPTIMISM,
    logoURI: ethereumLogo,
    explorerUrl: "https://optimistic.etherscan.io",
    constructExplorerLink: (txHash: string) =>
      `https://optimistic.etherscan.io/tx/${txHash}`,
    nativeCurrency: {
      name: "Ether",
      symbol: "OETH",
      decimals: 18,
    },
  },
  [ChainId.METER]: {
    name: "Meter",
    chainId: ChainId.METER,
    logoURI: ethereumLogo,
    explorerUrl: "https://scan.meter.io",
    constructExplorerLink: (txHash: string) =>
      `https://scan.meter.io/tx/${txHash}`,
    nativeCurrency: {
      name: "Meter",
      symbol: "MTR",
      decimals: 18,
    },
  },
  [ChainId.XDAI]: {
    name: "xDai",
    chainId: ChainId.XDAI,
    logoURI: ethereumLogo,
    explorerUrl: "https://blockscout.com/xdai/mainnet",
    constructExplorerLink: (txHash: string) =>
      `https://blockscout.com/xdai/mainnet/tx/${txHash}`,
    nativeCurrency: {
      name: "xDai",
      symbol: "XDAI",
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
    explorerUrl: "https://blockexplorer.boba.network",
    constructExplorerLink: (txHash: string) =>
      `https://blockexplorer.boba.network/tx/${txHash}`,
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  [ChainId.SX]: {
    name: "SX",
    chainId: ChainId.SX,
    logoURI: ethereumLogo,
    explorerUrl: "https://explorer.sx.technology",
    constructExplorerLink: (txHash: string) =>
      `https://explorer.sx.technology/tx/${txHash}`,
    nativeCurrency: {
      name: "SX",
      symbol: "SX",
      decimals: 18,
    },
  },
  [ChainId.EVMOS]: {
    name: "Evmos",
    chainId: ChainId.EVMOS,
    logoURI: ethereumLogo,
    explorerUrl: "https://evm.evmos.org",
    constructExplorerLink: (txHash: string) =>
      `https://evm.evmos.org/tx/${txHash}`,
    nativeCurrency: {
      name: "Evmos",
      symbol: "EVMOS",
      decimals: 18,
    },
  },
  [ChainId.ARBITRUM]: {
    name: "Arbitrum",
    chainId: ChainId.ARBITRUM,
    logoURI: ethereumLogo,
    explorerUrl: "https://arbiscan.io",
    constructExplorerLink: (txHash: string) =>
      `https://arbiscan.io/tx/${txHash}`,
    nativeCurrency: {
      name: "Ether",
      symbol: "AETH",
      decimals: 18,
    },
  },
  [ChainId.AVAX]: {
    name: "Avalanche",
    chainId: ChainId.AVAX,
    logoURI: ethereumLogo,
    explorerUrl: "https://snowtrace.io",
    constructExplorerLink: (txHash: string) =>
      `https://snowtrace.io/tx/${txHash}`,
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
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
