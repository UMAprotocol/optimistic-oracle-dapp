import { useState, useEffect } from "react";
import { ICell, IRow } from "../table/Table";
import { DateTime } from "luxon";
import { oracle } from "@uma/sdk";
import { StyledLink } from "./RequestsTable.styled";
import { parseIdentifier } from "helpers/format";
const hc: ICell[] = [
  {
    size: "lg",
    value: "Query",
    cellClassName: "first-header-cell",
  },
  {
    size: "sm",
    value: "Timestamp",
    cellClassName: "other-header-cell",
  },
  {
    size: "sm",
    value: "Status",
    cellClassName: "other-header-cell",
  },
];

function useRequestsTableData(
  requests: oracle.types.state.RequestIndexes,
  requeryData: boolean,
  setRequeryData: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [rows, setRows] = useState<IRow[]>([]);
  const [headerCells] = useState<ICell[]>(hc);

  useEffect(() => {
    if (requeryData && requests.length) {
      const nextRows = [] as IRow[];
      requests.forEach((req) => {
        let identifier = "";
        try {
          identifier = parseIdentifier(req.identifier);
        } catch (err: any) {
          identifier = req.identifier;
          console.log("Error in parsing identifier", err.message);
        }

        const timestamp = DateTime.fromSeconds(Number(req.timestamp)).toFormat(
          "LLL. dd yyyy hh:mm:ss"
        );

        let requestState = "Invalid";
        if (req.state === oracle.types.state.RequestState.Requested)
          requestState = "Request";
        if (req.state === oracle.types.state.RequestState.Proposed)
          requestState = "Proposed";
        if (
          req.state === oracle.types.state.RequestState.Expired ||
          req.state === oracle.types.state.RequestState.Resolved
        )
          requestState = "Settable";
        if (req.state === oracle.types.state.RequestState.Disputed)
          requestState = "Disputed";
        if (req.state === oracle.types.state.RequestState.Settled)
          requestState = "Settled";

        const cells = [
          {
            size: "lg",
            value: (
              <StyledLink
                to={`/request?requester=${req.requester}
            &identifier=${req.identifier}&ancillaryData=${req.ancillaryData}&timestamp=${req.timestamp}&chainId=${req.chainId}
            `}
              >
                {identifier}
              </StyledLink>
            ),
            cellClassName: "first-cell",
          },
          {
            size: "sm",
            value: timestamp,
            cellClassName: "other-cell",
          },
          {
            size: "sm",
            value: requestState,
            cellClassName: "other-cell",
          },
        ] as ICell[];
        nextRows.push({ cells });
      });

      setRequeryData(false);
      setRows(nextRows);
    }
  }, [requests, requeryData, setRequeryData]);

  return { rows, headerCells };
}

export default useRequestsTableData;
