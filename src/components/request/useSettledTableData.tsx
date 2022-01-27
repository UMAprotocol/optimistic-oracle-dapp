import { useState, useEffect } from "react";
import { ICell, IRow } from "../table/Table";
const hc: ICell[] = [];

function useSettledTableData() {
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
            value: "0.3456",
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
            value: "0x123456789",
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
            value: "No",
          },
        ],
      },
    ] as IRow[];
    setRows(nextRows);
  }, []);

  return { rows, headerCells };
}

export default useSettledTableData;
