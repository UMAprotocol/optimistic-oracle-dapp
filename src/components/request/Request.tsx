import { useEffect } from "react";
import Table from "../table/Table";
import { useSearchParams } from "react-router-dom";
import useRequestTableData from "./useRequestTableData";
import { Wrapper, TableContentWrapper, TableSection } from "./Request.styled";
import RequestHero from "./RequestHero";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import { oracle } from "@uma/sdk";
import SettledTable from "./SettledTable";
import useSettledTableData from "./useSettledTableData";
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
  const { client, state } = useClient();
  const [searchParams] = useSearchParams();
  const { rows, headerCells } = useRequestTableData(searchParams);

  const { requestState } = useReader(state);

  const { rows: settleRows, headerCells: hc } = useSettledTableData();

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
      {requestState !== oracle.types.state.RequestState.Settled && (
        <RequestHero chainId={Number(searchParams.get("chainId")) ?? 0} />
      )}

      <TableSection>
        {requestState === oracle.types.state.RequestState.Settled && (
          <TableContentWrapper>
            <SettledTable />
          </TableContentWrapper>
        )}
        <TableContentWrapper>
          <Table title={"Input Data"} headerCells={headerCells} rows={rows} />
        </TableContentWrapper>
      </TableSection>
    </Wrapper>
  );
};

export default Request;
