import { Body } from "components/table/Table.styled";
import {
  StyledCellBody,
  StyledHeadRow,
  StyledTableWrapper,
  StyledRow,
} from "./RequestsTable.styled";

import createRequestsTableCells from "./createRequestsTableCells";
import { oracle } from "@uma/sdk";
type Requests = oracle.types.state.RequestsWithOracleType;

interface Props {
  requests: Requests;
}
const RequestsTable: React.FC<Props> = ({ requests }) => {
  const { headerCells, rows } = createRequestsTableCells(requests);
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
