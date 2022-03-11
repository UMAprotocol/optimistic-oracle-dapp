import { ethers } from "ethers";
import { DateTime } from "luxon";

export const prettyFormatNumber = Intl.NumberFormat("en-US").format;

// maximum length for a yes/no query ancillary question title
export const MAX_TITLE_LENGTH = 55;
export const DEFAULT_REQUEST_TITLE = "Optimistic Oracle Request";

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

export function parseAncillaryData(ancillaryData: string) {
  return ethers.utils.toUtf8String(ancillaryData);
}

export function validateYesNoQueryString(parsedAncillaryData: string) {
  return (
    parsedAncillaryData.includes("title: ") &&
    parsedAncillaryData.includes("description: ")
  );
}

// String has a particular format that includes break points like q: title: description:
// Split the string based on these common parts of query strings.
export function formatYesNoQueryString(
  str: string,
  maxLength = MAX_TITLE_LENGTH
) {
  // Split the string before title:
  const splitOne = str.split("title: ")[1];

  // Remove the string after description:
  const title = splitOne.split("description:")[0].replace(/[^\x20-\x7E]+/g, "");

  // remove the comma at the end.
  const formatted = title.substring(0, title.length - 2);

  // Return only the first 55 characters
  if (formatted.length > maxLength) {
    return `${formatted.substring(0, maxLength + 1)}...`;
  } else {
    return formatted;
  }
}

interface FormatRequestTitleParams {
  identifier?: string;
  ancillaryData?: string;
  maxTitleLength?: number;
  defaultTitle?: string;
}

export function formatRequestTitle(params: FormatRequestTitleParams) {
  const {
    identifier,
    ancillaryData,
    maxTitleLength = MAX_TITLE_LENGTH,
    defaultTitle = DEFAULT_REQUEST_TITLE,
  } = params;
  let title = defaultTitle;
  try {
    const parsedIdentifier = identifier
      ? parseIdentifier(identifier)
      : undefined;

    if (parsedIdentifier) title = parsedIdentifier;

    if (parsedIdentifier === "YES_OR_NO_QUERY") {
      if (!ancillaryData) return parsedIdentifier;
      const parsedAncillaryData = parseAncillaryData(ancillaryData);
      if (!validateYesNoQueryString(parsedAncillaryData))
        return parsedIdentifier;
      return formatYesNoQueryString(parsedAncillaryData, maxTitleLength);
    }
    // add future parsers here
  } catch (err) {
    console.error("Error Formatting Request Title", err, params);
  }
  return title;
}

export function formatDate(timestamp: number | string) {
  return DateTime.fromSeconds(Number(timestamp)).toFormat("LLL. dd yyyy");
}
export function formatTime(timestamp: number | string) {
  return DateTime.fromSeconds(Number(timestamp)).toFormat("ttt");
}
