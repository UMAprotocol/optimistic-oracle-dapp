import { useState, useEffect } from "react";
import { ICell, IRow } from "../table/Table";
import { oracle } from "@uma/sdk";
import { ethers } from "ethers";
import { CHAINS, ChainId } from "constants/blockchain";
const hc: ICell[] = [];
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

function useSettledTableData(
  proposer: string | undefined,
  disputer: string | undefined,
  proposedPrice: oracle.types.ethers.BigNumber | undefined,
  chainId: number | "" | null
) {
  const [rows, setRows] = useState<IRow[]>([]);
  const [headerCells] = useState<ICell[]>(hc);
  const cid: ChainId = chainId ? chainId : 1;
  useEffect(() => {
    let nextRows = [
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
            value: "Proposer",
            cellClassName: "first-cell",
          },
          {
            size: "lg",
            value: (
              <a
                target="_blank"
                rel="noreferrer"
                href={`${CHAINS[cid].explorerUrl}/address/${proposer}`}
              >
                {proposer}
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
            value: disputer && disputer !== NULL_ADDRESS ? "Yes" : "No",
          },
        ],
      },
    ] as IRow[];

    if (disputer && disputer !== NULL_ADDRESS) {
      nextRows.push({
        cells: [
          {
            size: "md",
            value: "Disputer",
            cellClassName: "first-cell",
          },
          {
            size: "lg",
            value: (
              <a
                target="_blank"
                rel="noreferrer"
                href={`${CHAINS[cid].explorerUrl}/address/${disputer}`}
              >
                {disputer}
              </a>
            ),
          },
        ],
      });
    }
    setRows(nextRows);
  }, [proposer, disputer, proposedPrice, cid]);

  return { rows, headerCells };
}

export default useSettledTableData;
