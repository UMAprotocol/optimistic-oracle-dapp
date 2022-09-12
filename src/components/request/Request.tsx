import { useEffect, useState } from "react";
import Table from "../table/Table";
import useRequestTableData from "./useRequestTableData";
import { useRequestInputRequired } from "hooks/useRequestParams";
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
import {
  getRequestInputByTransaction,
  getRequestInput,
} from "hooks/useRequestParams";
import { Loading } from "./Loading";
import { useSearchParams } from "react-router-dom";

const Request = () => {
  const [searchParams] = useSearchParams();
  const { client, state, flags, oracleType } = useClient();
  const requestQuery = useRequestInputRequired();
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

  useEffect(() => {
    // make sure client exists
    if (!client) return;
    // make sure the client oracle type matches the request query oracle type
    if (oracleType !== requestQuery?.oracleType) return;
    const request: unknown = Object.fromEntries([...searchParams]);
    try {
      let requestByTx = getRequestInputByTransaction(request);
      setRequestId(
        client.setActiveRequestByTransaction({
          chainId: requestByTx.chainId,
          transactionHash: requestByTx.transactionHash,
          eventIndex: requestByTx.eventIndex ?? 0,
        })
      );
    } catch (err) {
      console.warn("parsing query by transaction", err);
    }
    try {
      const requestInput = getRequestInput(request);
      setRequestId(
        client.setActiveRequest({
          requester: requestInput.requester.trim(),
          identifier: requestInput.identifier,
          timestamp: requestInput.timestamp,
          ancillaryData: requestInput.ancillaryData,
          chainId: requestInput.chainId,
        })
      );
    } catch (err) {
      console.warn("parsing query by input", err);
    }
  }, [client, searchParams, requestQuery?.oracleType, oracleType]);

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
