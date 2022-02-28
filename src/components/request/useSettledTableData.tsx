import { useState, useEffect } from "react";
import { ICell, IRow } from "../table/Table";
import { oracle } from "@uma/sdk";
import { ethers } from "ethers";
import { ChainId } from "constants/blockchain";
import { formatYesNoQueryString } from "helpers/format";
const hc: ICell[] = [];

function useSettledTableData(
  proposeTx: string | undefined,
  disputeTx: string | undefined,
  exploreProposeTx: string | undefined,
  exploreDisputeTx: string | undefined,
  proposedPrice: oracle.types.ethers.BigNumber | undefined,
  chainId: number,
  parsedIdentifier: string | undefined,
  ancillaryData: string | undefined
) {
  const [rows, setRows] = useState<IRow[]>([]);
  const [headerCells] = useState<ICell[]>(hc);
  const cid: ChainId = chainId ? chainId : 1;
  useEffect(() => {
    let formattedIdentifier = parsedIdentifier;
    try {
      if (formattedIdentifier === "YES_OR_NO_QUERY" && ancillaryData) {
        try {
          formattedIdentifier = formatYesNoQueryString(
            ethers.utils.toUtf8String(ancillaryData)
          );
        } catch (err: any) {
          console.error("error with formatYesNoQueryString call", err.message);
        }
      }
    } catch (err: any) {
      console.log("Error in parsing identifier", err.message);
    }

    let nextRows = [
      {
        cells: [
          {
            size: "md",
            value: "Query",
            cellClassName: "first-cell",
          },
          {
            size: "lg",
            value: formattedIdentifier || "",
          },
        ],
      },
      {
        cells: [
          {
            size: "md",
            value: "Proposed answer",
            cellClassName: "first-cell",
          },
          {
            size: "lg",
            value: proposedPrice ? ethers.utils.formatEther(proposedPrice) : "",
          },
        ],
      },
      {
        cells: [
          {
            size: "md",
            value: "Proposal",
            cellClassName: "first-cell",
          },
          {
            size: "lg",
            value: (
              <a target="_blank" rel="noreferrer" href={exploreProposeTx}>
                {proposeTx}
              </a>
            ),
          },
        ],
      },
      {
        cells: [
          {
            size: "md",
            value: "Disputed?",
            cellClassName: "first-cell",
          },
          {
            size: "lg",
            value: disputeTx ? "Yes" : "No",
          },
        ],
      },
    ] as IRow[];

    if (disputeTx) {
      nextRows.push({
        cells: [
          {
            size: "md",
            value: "Dispute",
            cellClassName: "first-cell",
          },
          {
            size: "lg",
            value: (
              <a target="_blank" rel="noreferrer" href={exploreDisputeTx}>
                {disputeTx}
              </a>
            ),
          },
        ],
      });
    }
    setRows(nextRows);
  }, [
    proposeTx,
    exploreProposeTx,
    disputeTx,
    exploreDisputeTx,
    proposedPrice,
    cid,
    parsedIdentifier,
    ancillaryData,
  ]);

  return { rows, headerCells };
}

export default useSettledTableData;
