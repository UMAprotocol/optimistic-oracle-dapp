import {
  TableWrapper,
  Row,
  Body,
  HeadRow,
  Cell,
} from "components/table/Table.styled";
import { ICell, IRow } from "../table/Table";

const headerCells: ICell[] = [
  {
    size: "lg",
    value: "Query",
  },
  {
    size: "sm",
    value: "Timestamp",
  },
  {
    size: "sm",
    value: "Status",
  },
];

const RequestsTable = () => {
  return (
    <TableWrapper>
      <HeadRow>
        {headerCells.map((cell, index) => {
          return (
            <Cell
              key={index}
              className={cell.cellClassName ?? ""}
              size={cell.size}
            >
              {cell.value}
            </Cell>
          );
        })}
      </HeadRow>
      <Body>
        {/* {rows.map((row, ridx) => {
          return (
            <Row key={ridx}>
              {row.cells.map((cell, cidx) => {
                return (
                  <Cell
                    className={cell.cellClassName ?? ""}
                    key={cidx}
                    size={cell.size}
                  >
                    {cell.value}
                  </Cell>
                );
              })}
            </Row>
          );
        })} */}
      </Body>
    </TableWrapper>
  );
};

export default RequestsTable;
