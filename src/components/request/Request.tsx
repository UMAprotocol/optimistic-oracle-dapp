import { useEffect } from "react";
import Table from "../table/Table";
import { useSearchParams } from "react-router-dom";
import useRequestTableData from "./useRequestTableData";
import { Wrapper, TableContentWrapper, TableSection } from "./Request.styled";
import RequestHero from "./RequestHero";
import useClient from "hooks/useOracleClient";

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
  const { client } = useClient();
  const [searchParams] = useSearchParams();
  const { rows, headerCells } = useRequestTableData(searchParams);

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
      <RequestHero chainId={Number(searchParams.get("chainId")) ?? 0} />
      <TableSection>
        <TableContentWrapper>
          <Table title={"Input Data"} headerCells={headerCells} rows={rows} />
        </TableContentWrapper>
      </TableSection>
    </Wrapper>
  );
};

export default Request;
