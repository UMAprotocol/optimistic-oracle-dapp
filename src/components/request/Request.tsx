import { useEffect, useState } from "react";
import Table from "../table/Table";
import useRequestTableData from "./useRequestTableData";
import {
  Wrapper,
  TableContentWrapper,
  TableSection,
  TableTitle,
  Spacer,
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
import { Loading } from "./Loading";

const Request = () => {
  const { client, state, flags } = useClient();
  const [requestId, setRequestId] = useState<string | undefined>(undefined);
  const [requestLoading, setRequestLoading] = useState(true);

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
    chainId,
    requester,
    identifier,
    ancillaryData,
    timestamp: timestamp ? Number(timestamp) : undefined,
    requestTxHash: requestTx,
  });

  const isByTransactionParams = useIsByTransactionParams();
  const { request, error } = useRequestParams(isByTransactionParams);

  useEffect(() => {
    // TODO: would be nice to do something with the error here, like redirect to the homepage
    if (!error && request) {
      if (isByTransactionRequest(request)) {
        setRequestId(
          client.setActiveRequestByTransaction({
            chainId: request.chainId,
            transactionHash: request.transactionHash,
            eventIndex: request.eventIndex ?? 0,
          })
        );
      } else {
        setRequestId(
          client.setActiveRequest({
            requester: request.requester.trim(),
            identifier: request.identifier,
            timestamp: request.timestamp,
            ancillaryData: request.ancillaryData,
            chainId: request.chainId,
          })
        );
      }
    }
  }, [client, error, request]);

  useEffect(() => {
    if (!requestId) return;
    if (!state?.commands?.[requestId]) return;
    const command = state.commands[requestId];
    if (!command.done) return;
    setRequestLoading(false);
  }, [requestId, state.commands]);

  return (
    <>
      {requestLoading ? (
        <Wrapper>
          <Spacer />
          <Loading />
        </Wrapper>
      ) : (
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
                  ancillaryData={ancillaryData}
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
      )}
    </>
  );
};

export default Request;
