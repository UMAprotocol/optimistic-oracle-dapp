import { useEffect } from "react";
import Table from "../table/Table";
import { useSearchParams } from "react-router-dom";
import useRequestTableData from "./useRequestTableData";
import { Wrapper, TableContentWrapper, TableSection } from "./Request.styled";
import RequestHero from "./RequestHero";
import useRequestClient from "hooks/useRequestClient";
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
  const { client, setActiveRequest } = useRequestClient();
  const [searchParams] = useSearchParams();
  const { rows, headerCells } = useRequestTableData(searchParams);

  useEffect(() => {
    const request = {
      requester: searchParams.get("requester") ?? "",
      identifier: searchParams.get("identifier") ?? "",
      timestamp: Number(searchParams.get("timestamp")) ?? "",
      ancillaryData: searchParams.get("ancillaryData") ?? "",
      chainId: Number(searchParams.get("chainId")) ?? 1,
    };

    setActiveRequest(request);
  }, [searchParams, client, setActiveRequest]);

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
