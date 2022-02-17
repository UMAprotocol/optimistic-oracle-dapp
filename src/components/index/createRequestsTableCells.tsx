import { ICell, IRow } from "../table/Table";
import { DateTime } from "luxon";
import { oracle } from "@uma/sdk";
import { StyledLink, AlertLogo } from "./RequestsTable.styled";
import { parseIdentifier } from "helpers/format";
import { ethers } from "ethers";
import formatYesNoQueryString from "helpers/formatYesNoQueryString";
import alertIcon from "assets/alert-icon.svg";

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
  {
    size: "sm",
    value: "Proposed answer",
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
          try {
            identifier = formatYesNoQueryString(
              ethers.utils.toUtf8String(req.ancillaryData)
            );
          } catch (err: any) {
            console.error(
              "error with formatYesNoQueryString call",
              err.message
            );
          }
        }
      } catch (err: any) {
        identifier = req.identifier;
        console.log("Error in parsing identifier", err.message);
      }

      const timestamp = DateTime.fromSeconds(Number(req.timestamp)).toFormat(
        "LLL. dd yyyy hh:mm:ss"
      );

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
            <AlertLogo src={alertIcon} alt="alert_icon" /> Disput{" "}
          </span>
        );
      if (req.state === oracle.types.state.RequestState.Settled)
        requestState = "Settled";

      let proposedPrice = req.proposedPrice;
      if (
        req.proposedPrice &&
        req.proposedPrice !== "0" &&
        identifier !== "YES_OR_NO_QUERY"
      ) {
        proposedPrice = ethers.utils.formatEther(req.proposedPrice);
      }

      if (
        req.proposedPrice &&
        parseIdentifier(req.identifier) === "YES_OR_NO_QUERY"
      ) {
        const formattedPrice = ethers.utils.formatEther(req.proposedPrice);
        if (formattedPrice === "0.0") proposedPrice = "No";
        if (formattedPrice === "1.0") proposedPrice = "Yes";
        if (formattedPrice === "0.5") proposedPrice = "Indeterminate";
      }

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
