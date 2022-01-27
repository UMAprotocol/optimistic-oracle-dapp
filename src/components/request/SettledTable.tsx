import styled from "@emotion/styled";
import { FC } from "react";
import {
  TableWrapper,
  Row,
  Body,
  HeadRow,
  Cell,
  Title,
} from "components/table/Table.styled";

import useSettledTableData from "./useSettledTableData";

const SettledTable: FC = () => {
  const { rows, headerCells } = useSettledTableData();
  const title = "Resolution";

  return (
    <TableWrapper>
      {title && typeof title === "string" ? (
        <Title>{title}</Title>
      ) : title ? (
        title
      ) : null}
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
        {rows.map((row, ridx) => {
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
        })}
      </Body>
    </TableWrapper>
  );
};

export default SettledTable;
