import { ICell, IRow } from "../table/Table";
import { oracle } from "@uma/sdk";
import { StyledLink, AlertLogo } from "./RequestsTable.styled";
import { parseIdentifier } from "helpers/format";
import { ethers } from "ethers";
import { formatRequestTitle, formatTime, formatDate } from "helpers/format";
import alertIcon from "assets/alert-icon.svg";

const unanswerable = [
  "-57896044618658097711785492504343953926634992332820282019728792003956564819968",
];

const headerCells: ICell[] = [
  {
    size: "lg",
    value: "Query",
    cellClassName: "first-header-cell",
  },
  {
    size: "sm",
    value: "Request Timestamp",
    cellClassName: "other-header-cell",
  },
  {
    size: "sm",
    value: "Status",
    cellClassName: "other-header-cell",
  },
  {
    size: "sm",
    value: "Proposed answer",
    cellClassName: "other-header-cell",
  },
];

function createRequestsTableCells(
  requests: oracle.types.state.RequestsWithOracleType
) {
  const rows = [] as IRow[];

  if (requests.length) {
    requests.forEach((req) => {
      const title = formatRequestTitle(req);
      const identifier = parseIdentifier(req.identifier);
      const timestamp = req.timestamp ? (
        <div>
          {formatDate(req.timestamp)}
          <br />
          {formatTime(req.timestamp)}
        </div>
      ) : undefined;

      let requestState: any = "Invalid";
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
        requestState = (
          <span>
            <AlertLogo src={alertIcon} alt="alert_icon" /> Dispute{" "}
          </span>
        );
      if (req.state === oracle.types.state.RequestState.Settled)
        requestState = "Settled";

      let proposedPrice = req.proposedPrice
        ? req.proposedPrice.toString()
        : undefined;

      // req.state 1 is fresh request with no proposed answer, in that case always set to "-"
      // proposed price sometimes defaults to 0 even if noone has proposed an answer yet.
      if (req.state === undefined || req.state <= 1) {
        proposedPrice = "-";
      } else if (proposedPrice && unanswerable.includes(proposedPrice)) {
        proposedPrice = "Requested too early";
      } else if (
        proposedPrice &&
        proposedPrice !== "0" &&
        identifier !== "YES_OR_NO_QUERY"
      ) {
        proposedPrice = ethers.utils.formatEther(proposedPrice);
      } else if (proposedPrice && identifier === "YES_OR_NO_QUERY") {
        const formattedPrice = ethers.utils.formatEther(proposedPrice);
        if (formattedPrice === "0.0") proposedPrice = "No";
        if (formattedPrice === "1.0") proposedPrice = "Yes";
        if (formattedPrice === "0.5") proposedPrice = "Indeterminate";
      }

      // we can lookup the transaction based on request, dispute or settle transactions
      const requestDetailsLink = `/request?transactionHash=${
        req.requestTx || req.proposeTx || req.disputeTx || req.settleTx
      }&chainId=${req.chainId}&oracleType=${req.oracleType}&eventIndex=${0}`;

      const cells = [
        {
          size: "lg",
          value: <StyledLink to={requestDetailsLink}>{title}</StyledLink>,
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
        {
          size: "sm",
          value: proposedPrice ?? "-",
          cellClassName: "other-cell",
        },
      ] as ICell[];
      rows.push({ cells });
    });
  }

  return { rows, headerCells };
}

export default createRequestsTableCells;
