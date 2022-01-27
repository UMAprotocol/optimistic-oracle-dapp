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
