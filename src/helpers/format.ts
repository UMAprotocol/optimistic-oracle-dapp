import { ethers } from "ethers";

export const prettyFormatNumber = Intl.NumberFormat("en-US").format;

export class Explorer {
  constructor(private base: string) {}
  tx = (hash: string): string => {
    return `${this.base}/tx/${hash}`;
  };
  address = (address: string): string => {
    return `${this.base}/address/${address}`;
  };
}

// Shorten a long string and put ellipses in the middle
export function shortenString(str: string, length = 10) {
  if (str.length <= length) return str;
  const offset = Math.floor(length / 2);
  const first = str.slice(0, offset);
  const last = str.slice(-offset);
  return [first, last].join("...");
}

export function parseIdentifier(identifier: string | null | undefined) {
  // replace non ascii chars
  return ethers.utils
    .toUtf8String(identifier || [])
    .replace(/[^\x20-\x7E]+/g, "");
}
