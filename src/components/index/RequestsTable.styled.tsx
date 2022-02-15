import styled from "@emotion/styled";
import { Cell } from "components/table/Table.styled";

export const StyledCellBody = styled(Cell)`
  &.first-cell {
    font-weight: 600;
    flex: 1 0 280px;
  }
  &.other-cell {
    flex: 0 0 200px;
  }
`;
