import styled from "@emotion/styled";
import {
  Cell,
  HeadRow,
  TableWrapper,
  Row,
} from "components/table/Table.styled";

export const StyledTableWrapper = styled(TableWrapper)`
  box-shadow: none;
`;

export const StyledHeadRow = styled(HeadRow)`
  background: transparent;
  border: 0;
`;

export const StyledCellBody = styled(Cell)`
  &.first-cell {
    font-weight: 600;
    flex: 1 0 280px;
    &:hover {
      color: #ff4a4a;
      cursor: pointer;
    }
  }
  &.other-cell {
    flex: 0 0 200px;
  }
`;

export const StyledRow = styled(Row)`
  &:nth-of-type(2n) {
    background-color: #f5f5f5;
  }
  margin: 2px 0;
`;
