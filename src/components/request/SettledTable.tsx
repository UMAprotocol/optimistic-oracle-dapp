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
import { oracle } from "@uma/sdk";
import useSettledTableData from "./useSettledTableData";

interface Props {
  proposer: string | undefined;
  disputer: string | undefined;
  proposedPrice: oracle.types.ethers.BigNumber | undefined;
}
const SettledTable: FC<Props> = ({ proposer, disputer, proposedPrice }) => {
  const { rows, headerCells } = useSettledTableData(
    proposer,
    disputer,
    proposedPrice
  );
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
                  <StyledCellBody
                    className={cell.cellClassName ?? ""}
                    key={cidx}
                    size={cell.size}
                  >
                    {cell.value}
                  </StyledCellBody>
                );
              })}
            </Row>
          );
        })}
      </Body>
    </TableWrapper>
  );
};

const StyledCellBody = styled(Cell)`
  &.first-cell {
    font-weight: 700;
    flex: 0 0 280px;
  }
`;

export default SettledTable;
