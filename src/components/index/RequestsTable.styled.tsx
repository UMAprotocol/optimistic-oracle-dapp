import styled from "@emotion/styled";
import {
  Cell,
  HeadRow,
  TableWrapper,
  Row,
} from "components/table/Table.styled";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: #272528;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    color: #ff4a4a;
    cursor: pointer;
  }
`;

export const StyledTableWrapper = styled(TableWrapper)`
  box-shadow: none;
`;

export const StyledHeadRow = styled(HeadRow)`
  background: transparent;
  border: 0;
`;

export const StyledCellBody = styled(Cell)`
  &.first-cell,
  &.first-header-cell {
    font-weight: 600;
    flex: 1 0 280px;
  }

  &.other-cell,
  &.other-header-cell {
    flex: 0 0 200px;
  }
  &.other-header-cell {
    font-weight: 600;
  }
`;

export const StyledRow = styled(Row)`
  &:nth-of-type(2n) {
    background-color: #f5f5f5;
  }
  margin: 4px 0;
`;

export const AlertLogo = styled.img`
  height: 16px;
  margin-left: -4px;
`;
