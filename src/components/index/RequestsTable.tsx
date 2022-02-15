import { Body } from "components/table/Table.styled";
import { ICell, IRow } from "../table/Table";
import {
  StyledCellBody,
  StyledHeadRow,
  StyledTableWrapper,
  StyledRow,
} from "./RequestsTable.styled";

const headerCells: ICell[] = [
  {
    size: "lg",
    value: "Query",
    cellClassName: "first-cell",
  },
  {
    size: "sm",
    value: "Timestamp",
    cellClassName: "other-cell",
  },
  {
    size: "sm",
    value: "Status",
    cellClassName: "other-cell",
  },
];

const rows: IRow[] = [
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
];

const RequestsTable = () => {
  return (
    <StyledTableWrapper>
      <StyledHeadRow>
        {headerCells.map((cell, index) => {
          return (
            <StyledCellBody
              key={index}
              className={cell.cellClassName ?? ""}
              size={cell.size}
            >
              {cell.value}
            </StyledCellBody>
          );
        })}
      </StyledHeadRow>
      <Body>
        {rows.map((row, ridx) => {
          return (
            <StyledRow key={ridx}>
              {row.cells.map((cell, cidx) => {
                return (
                  <StyledCellBody
                    className={cell.cellClassName ?? ""}
                    key={cidx}
                    size={cell.size}
                  >
                    {cell.value}
                  </StyledCellBody>
                );
              })}
            </StyledRow>
          );
        })}
      </Body>
    </StyledTableWrapper>
  );
};

export default RequestsTable;
