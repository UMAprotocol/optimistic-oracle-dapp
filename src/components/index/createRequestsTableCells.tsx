import { ICell, IRow } from "../table/Table";
import { DateTime } from "luxon";
import { oracle } from "@uma/sdk";
import { StyledLink } from "./RequestsTable.styled";
import { parseIdentifier } from "helpers/format";
import { ethers } from "ethers";
import formatYesNoQueryString from "helpers/formatYesNoQueryString";
const headerCells: ICell[] = [
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

function createRequestsTableCells(requests: oracle.types.state.RequestIndexes) {
  const rows = [] as IRow[];

  if (requests.length) {
    requests.forEach((req) => {
      let identifier = "";
      try {
        identifier = parseIdentifier(req.identifier);
        if (identifier === "YES_OR_NO_QUERY") {
          identifier = formatYesNoQueryString(
            ethers.utils.toUtf8String(req.ancillaryData)
          );
        }
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
      rows.push({ cells });
    });
  }

  return { rows, headerCells };
}

export default createRequestsTableCells;
