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
/* Search Params:
  {
    requester: string;
    identifier: string;
    ancillaryData: string;
    timestamp: number;
    chainId: number;
  } 
*/

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

  useEffect(() => {
    const requester = searchParams.get("requester")?.trim();
    const identifier = searchParams.get("identifier");
    const timestamp =
      searchParams.get("timestamp") && Number(searchParams.get("timestamp"));
    const ancillaryData = searchParams.get("ancillaryData");
    const chainId =
      searchParams.get("chainId") && Number(searchParams.get("chainId"));

    if (requester && identifier && timestamp && ancillaryData && chainId) {
      client.setActiveRequest({
        requester,
        identifier,
        timestamp,
        ancillaryData,
        chainId,
      });
    }
  }, [searchParams, client]);

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
