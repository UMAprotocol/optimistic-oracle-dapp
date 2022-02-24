import { useEffect } from "react";
import Table from "../table/Table";
import { useSearchParams } from "react-router-dom";
import useRequestTableData from "./useRequestTableData";
import {
  Wrapper,
  TableContentWrapper,
  TableSection,
  TableTitle,
} from "./Request.styled";
import RequestHero from "./RequestHero";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import SettledTable from "./SettledTable";
import dataIcon from "assets/data-icon.svg";
import useRequestParams, {
  isByTransactionRequest,
} from "hooks/useRequestParams";
import useIsByTransactionParams from "hooks/useIsByTransactionParams";
import { ChainId } from "constants/blockchain";

const Request = () => {
  const { client, state, flags } = useClient();
  const [searchParams] = useSearchParams();

  const {
    chainId,
    proposeTx,
    disputeTx,
    exploreProposeTx,
    exploreDisputeTx,
    proposedPrice,
    requester,
    ancillaryData,
    identifier,
    timestamp,
    parsedIdentifier,
    requestTx,
  } = useReader(state);

  const { rows, headerCells } = useRequestTableData({
    chainId: (Number(searchParams.get("chainId")) as ChainId) || chainId,
    requester: searchParams.get("requester") ?? requester,
    identifier: searchParams.get("identifier") ?? identifier,
    ancillaryData: searchParams.get("ancillaryData") ?? ancillaryData,
    timestamp: Number(searchParams.get("timestamp")) || timestamp,
    requestTxHash: requestTx,
  });

  const isByTransactionParams = useIsByTransactionParams();
  const { request, error } = useRequestParams(isByTransactionParams);

  useEffect(() => {
    // TODO: would be nice to do something with the error here, like redirect to the homepage
    if (!error && request) {
      if (isByTransactionRequest(request)) {
        client.setActiveRequestByTransaction({
          chainId: request.chainId,
          transactionHash: request.transactionHash,
          eventIndex: request.eventIndex ?? 0,
        });
      } else {
        client.setActiveRequest({
          requester: request.requester.trim(),
          identifier: request.identifier,
          timestamp: request.timestamp,
          ancillaryData: request.ancillaryData,
          chainId: request.chainId,
        });
      }
    }
  }, [client, error, request]);

  return (
    <Wrapper>
      {!flags.RequestSettled && <RequestHero chainId={chainId} />}

      <TableSection>
        {flags.RequestSettled && (
          <TableContentWrapper>
            <SettledTable
              chainId={chainId}
              proposeTx={proposeTx}
              disputeTx={disputeTx}
              exploreProposeTx={exploreProposeTx}
              exploreDisputeTx={exploreDisputeTx}
              proposedPrice={proposedPrice}
              parsedIdentifier={parsedIdentifier}
              request={request}
            />
          </TableContentWrapper>
        )}
        <TableContentWrapper>
          <Table
            title={
              <TableTitle>
                <img src={dataIcon} alt="data_icon" />
                <span>Input Data</span>
              </TableTitle>
            }
            headerCells={headerCells}
            rows={rows}
          />
        </TableContentWrapper>
      </TableSection>
    </Wrapper>
  );
};

export default Request;
