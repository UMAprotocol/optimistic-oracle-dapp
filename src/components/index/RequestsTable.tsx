import { useState, useEffect } from "react";
import { Body } from "components/table/Table.styled";
import {
  StyledCellBody,
  StyledHeadRow,
  StyledTableWrapper,
  StyledRow,
} from "./RequestsTable.styled";

import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import useRequestsTableData from "./useRequestsTableData";

const RequestsTable = () => {
  const { state } = useClient();
  const { descendingRequests } = useReader(state);
  const [requeryData, setRequeryData] = useState(true);
  const { headerCells, rows } = useRequestsTableData(
    descendingRequests,
    requeryData,
    setRequeryData
  );

  // Re-renders table too quickly. Slow down renders from requests.
  useEffect(() => {
    const interval = setInterval(() => {
      setRequeryData(true);
    }, 10000);

    return () => clearInterval(interval);
  }, [setRequeryData]);

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
