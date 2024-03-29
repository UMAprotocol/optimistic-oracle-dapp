import { useState, useEffect } from "react";
import { ICell, IRow } from "../table/Table";
import { ethers } from "ethers";
import { CHAINS, ChainId } from "constants/blockchain";
import { parseIdentifier, formatTime, formatDate } from "helpers/format";
import { useOptimisticGovernorRules } from "hooks/useOptimisticGovernorRules";

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
  const { rules, explanation } = useOptimisticGovernorRules();

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
          value: "address",
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
          value: "request timestamp",
        },
        {
          size: "sm",
          value: "uint256",
        },
        {
          size: "lg",
          value: timestamp ? (
            <div>
              {formatDate(timestamp)}
              <br />
              {formatTime(timestamp)} ({timestamp})
            </div>
          ) : (
            ""
          ),
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

    let umipLink =
      "https://docs.umaproject.org/resources/approved-price-identifiers";
    if (convertedIdentifier === "YES_OR_NO_QUERY") {
      umipLink =
        "https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-107.md";
    }

    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "6",
        },
        {
          size: "sm",
          value: "UMIP",
        },
        {
          size: "sm",
          value: "string",
        },
        {
          size: "lg",
          value: (
            <a target="_blank" rel="noreferrer" href={umipLink}>
              {convertedIdentifier === "YES_OR_NO_QUERY"
                ? "UMIP-107"
                : "Approved price identifiers"}
            </a>
          ),
        },
      ],
    });

    if (rules !== undefined) {
      nextRows.push({
        cells: [
          {
            size: "xs",
            value: "7",
          },
          {
            size: "sm",
            value: "rules",
          },
          {
            size: "sm",
            value: "string",
          },
          {
            size: "lg",
            value: rules,
          },
        ],
      });
    }

    if (explanation !== undefined) {
      nextRows.push({
        cells: [
          {
            size: "xs",
            value: "8",
          },
          {
            size: "sm",
            value: "explanation",
          },
          {
            size: "sm",
            value: "string",
          },
          {
            size: "lg",
            value: explanation,
          },
        ],
      });
    }
    setRows(nextRows);
  }, [
    chainId,
    requester,
    identifier,
    timestamp,
    ancillaryData,
    requestTxHash,
    rules,
    explanation,
  ]);

  return { rows, headerCells };
}

export default useRequestTableData;
