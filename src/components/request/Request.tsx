import { useContext, useEffect } from "react";
import Table from "../table/Table";
import { useSearchParams } from "react-router-dom";
import useRequestTableData from "./useRequestTableData";
import { Wrapper, TableContentWrapper, TableSection } from "./Request.styled";
import RequestHero from "./RequestHero";
import { RequestClientContext } from "context/RequestClientContext";
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
  const client = useContext(RequestClientContext);
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

    client.setActiveRequest(request);
    const input = client.store.read().inputRequest();
    console.log("input", input);
  }, [searchParams, client]);
  return (
    <Wrapper>
      <RequestHero />
      <TableSection>
        <TableContentWrapper>
          <Table title={"Input Data"} headerCells={headerCells} rows={rows} />
        </TableContentWrapper>
      </TableSection>
    </Wrapper>
  );
};

export default Request;
