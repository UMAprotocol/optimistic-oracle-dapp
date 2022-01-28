import { useState, useEffect } from "react";
import { ICell, IRow } from "../table/Table";
import { oracle } from "@uma/sdk";
import { ethers } from "ethers";
const hc: ICell[] = [];

function useSettledTableData(
  proposer: string | undefined,
  disputer: string | undefined,
  proposedPrice: oracle.types.ethers.BigNumber | undefined
) {
  const [rows, setRows] = useState<IRow[]>([]);
  const [headerCells] = useState<ICell[]>(hc);

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
            value: proposer,
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
            value: disputer ? "Yes" : "No",
          },
        ],
      },
    ] as IRow[];

    if (disputer) {
      nextRows.push({
        cells: [
          {
            size: "md",
            value: "Disputer",
            cellClassName: "first-cell",
          },
          {
            size: "lg",
            value: disputer,
          },
        ],
      });
    }
    setRows(nextRows);
  }, [proposer, disputer, proposedPrice]);

  return { rows, headerCells };
}

export default useSettledTableData;
