import { useState, useEffect } from "react";
import { ICell, IRow } from "../table/Table";
import { DateTime } from "luxon";
import { ethers } from "ethers";

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

function useRequestTableData(searchParams: URLSearchParams) {
  const [rows, setRows] = useState<IRow[]>([]);
  const [headerCells] = useState<ICell[]>(hc);

  useEffect(() => {
    const nextRows = [] as IRow[];

    const nextRequester = searchParams.get("requester");
    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "0",
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
              href={`https://etherscan.io/address/${nextRequester}`}
            >
              {nextRequester}
            </a>
          ),
        },
      ],
    });

    let nextIdentifier = searchParams.get("identifier");
    let convertedIdentifier = "";
    if (nextIdentifier) {
      try {
        convertedIdentifier = ethers.utils.toUtf8String(nextIdentifier);
      } catch (err) {
        convertedIdentifier = "Not convertible to UTF-8 string.";
        console.log("not convertible to UTF8");
      }
    }
    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "1",
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
    const nextTimestamp = searchParams.get("timestamp");

    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "2",
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
          value: nextTimestamp
            ? `${DateTime.fromSeconds(Number(nextTimestamp)).toFormat(
                "LLL. dd yyyy hh:mm:ss"
              )} (${nextTimestamp})`
            : "",
        },
      ],
    });

    let nextAncillaryData = searchParams.get("ancillaryData");
    let convertedAncillaryData = "";
    if (nextAncillaryData) {
      try {
        convertedAncillaryData = ethers.utils.toUtf8String(nextAncillaryData);
      } catch (err) {
        convertedAncillaryData = "Not convertible to UTF-8 string.";
        console.log("not convertible to UTF8");
      }
    }

    nextRows.push({
      cells: [
        {
          size: "xs",
          value: "3",
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
          value: "4",
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
          value: nextAncillaryData ?? "",
        },
      ],
    });
    setRows(nextRows);
  }, [searchParams]);

  return { rows, headerCells };
}

export default useRequestTableData;
