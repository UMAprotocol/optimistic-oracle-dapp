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
import useRequestParams, { isLegacyRequest } from "hooks/useRequestParams";
import useIsLegacyParams from "hooks/useIsLegacyParams";

const Request = () => {
  const { client, state, flags } = useClient();
  const [searchParams] = useSearchParams();
  const { rows, headerCells } = useRequestTableData(searchParams);

  const {
    chainId,
    proposeTx,
    disputeTx,
    exploreProposeTx,
    exploreDisputeTx,
    proposedPrice,
    parsedIdentifier,
  } = useReader(state);

  const isLegacyParams = useIsLegacyParams();
  const { request, error } = useRequestParams(isLegacyParams);

  useEffect(() => {
    // TODO: would be nice to do something with the error here, like redirect to the homepage
    if (!error) {
      if (isLegacyRequest(request)) {
        client.setActiveRequest({
          requester: request.requester.trim(),
          identifier: request.identifier,
          timestamp: request.timestamp,
          ancillaryData: request.ancillaryData,
          chainId: request.chainId,
        });
      } else {
        // FIXME: once we bump the SDK to 0.22, uncomment this
        // client.setActiveRequest({
        //   transactionHash: request.transactionHash,
        //   chainId: request.chainId,
        //   eventIndex: request.eventIndex,
        // });
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
