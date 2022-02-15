import { useState, useEffect } from "react";
import { ICell, IRow } from "../table/Table";
import { DateTime } from "luxon";
import { ethers } from "ethers";
import { CHAINS, ChainId } from "constants/blockchain";
import { oracle } from "@uma/sdk";

const hc: ICell[] = [
  {
    size: "lg",
    value: "Query",
    cellClassName: "first-header-cell",
  },
  {
    size: "sm",
    value: "Timestamp",
    cellClassName: "other-header-cell",
  },
  {
    size: "sm",
    value: "Status",
    cellClassName: "other-header-cell",
  },
];

function useRequestsTableData(requests: oracle.types.state.RequestIndexes) {
  const [rows, setRows] = useState<IRow[]>([]);
  const [headerCells] = useState<ICell[]>(hc);

  useEffect(() => {
    const nextRows = [
      {
        cells: [
          {
            size: "lg",
            value: "USDETH",
            cellClassName: "first-cell",
          },
          {
            size: "sm",
            value: "Nov 17th 2021 1pm",
            cellClassName: "other-cell",
          },
          {
            size: "sm",
            value: "Request",
            cellClassName: "other-cell",
          },
        ],
      },
      {
        cells: [
          {
            size: "lg",
            value: "Will Batman get 90% on Rotten Tomatoes?",
            cellClassName: "first-cell",
          },
          {
            size: "sm",
            value: "Nov 19th 2021 3pm",
            cellClassName: "other-cell",
          },
          {
            size: "sm",
            value: "Proposed",
            cellClassName: "other-cell",
          },
        ],
      },
    ] as IRow[];

    setRows(nextRows);
  }, [requests]);

  return { rows, headerCells };
}

export default useRequestsTableData;
