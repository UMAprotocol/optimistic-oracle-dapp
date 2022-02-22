import { useState, useEffect } from "react";
import { ICell, IRow } from "../table/Table";
import { DateTime } from "luxon";
import { ethers } from "ethers";
import { CHAINS, ChainId } from "constants/blockchain";
import { parseIdentifier } from "../../helpers/format";

const hc: ICell[] = [
  {
    size: "xs",
    value: "#",
  },
  {
    size: "sm",
    value: "Name",
  },
  {
    size: "sm",
    value: "Type",
  },
  {
    size: "lg",
    value: "Data",
  },
];

type UseRequestTableParams = {
  chainId?: ChainId;
  requester?: string;
  identifier?: string;
  timestamp?: number;
  ancillaryData?: string;
  requestTxHash?: string;
};
function useRequestTableData({
  chainId = 1,
  requester,
  identifier,
  timestamp,
  ancillaryData,
  requestTxHash,
}: UseRequestTableParams) {
  const [rows, setRows] = useState<IRow[]>([]);
  const [headerCells] = useState<ICell[]>(hc);

  useEffect(() => {
    const nextRows = [] as IRow[];

    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "0",
        },
        {
          size: "sm",
          value: "Request",
        },
        {
          size: "sm",
          value: "bytes",
        },
        {
          size: "lg",
          value: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${CHAINS[chainId].explorerUrl}/tx/${requestTxHash}`}
            >
              {requestTxHash}
            </a>
          ),
        },
      ],
    });

    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "1",
        },
        {
          size: "sm",
          value: "requester",
        },
        {
          size: "sm",
          value: "Address",
        },
        {
          size: "lg",
          value: (
            <a
              target="_blank"
              rel="noreferrer"
              href={`${CHAINS[chainId].explorerUrl}/address/${requester}`}
            >
              {requester}
            </a>
          ),
        },
      ],
    });

    let convertedIdentifier = "";
    try {
      convertedIdentifier = parseIdentifier(identifier);
    } catch (err) {
      console.error(err);
      convertedIdentifier = "Not convertible to UTF-8 string.";
    }
    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "2",
        },
        {
          size: "sm",
          value: "identifier",
        },
        {
          size: "sm",
          value: "bytes32",
        },
        {
          size: "lg",
          value: convertedIdentifier,
        },
      ],
    });

    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "3",
        },
        {
          size: "sm",
          value: "timestamp",
        },
        {
          size: "sm",
          value: "uint256",
        },
        {
          size: "lg",
          value: timestamp
            ? `${DateTime.fromSeconds(timestamp).toFormat(
                "LLL. dd yyyy hh:mm:ss"
              )} (${timestamp})`
            : "",
        },
      ],
    });

    let convertedAncillaryData = "";
    if (ancillaryData && ancillaryData !== "0x") {
      try {
        convertedAncillaryData = ethers.utils.toUtf8String(ancillaryData);
      } catch (err) {
        convertedAncillaryData = "Not convertible to UTF-8 string.";
        console.log("not convertible to UTF8");
      }
    } else {
      convertedAncillaryData = "No ancillary data for this request.";
    }

    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "4",
        },
        {
          size: "sm",
          value: "ancillaryData",
        },
        {
          size: "sm",
          value: "string",
        },
        {
          size: "lg",
          value: convertedAncillaryData,
        },
      ],
    });

    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "5",
        },
        {
          size: "sm",
          value: "ancillaryData",
        },
        {
          size: "sm",
          value: "bytes",
        },
        {
          size: "lg",
          value: ancillaryData ?? "",
        },
      ],
    });
    setRows(nextRows);
  }, [chainId, requester, identifier, timestamp, ancillaryData, requestTxHash]);

  return { rows, headerCells };
}

export default useRequestTableData;
