import styled from "@emotion/styled";
import { FC } from "react";
import {
  TableWrapper,
  Row,
  Body,
  HeadRow,
  Cell,
} from "components/table/Table.styled";
import { oracle } from "@uma/sdk";
import useSettledTableData from "./useSettledTableData";
import { TableTitle } from "./Request.styled";
import dataIcon from "assets/data-icon.svg";

interface Props {
  proposer: string | undefined;
  disputer: string | undefined;
  proposedPrice: oracle.types.ethers.BigNumber | undefined;
  chainId: number | "" | null;
}
const SettledTable: FC<Props> = ({
  proposer,
  disputer,
  proposedPrice,
  chainId,
}) => {
  const { rows, headerCells } = useSettledTableData(
    proposer,
    disputer,
    proposedPrice,
    chainId
  );

  return (
    <TableWrapper>
      <SettleTitle>
        <img src={dataIcon} alt="data_icon" />
        <span>Resolution</span>
      </SettleTitle>
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

const SettleTitle = styled(TableTitle)`
  span {
    margin-left: 0.75rem;
  }
`;

export default SettledTable;
