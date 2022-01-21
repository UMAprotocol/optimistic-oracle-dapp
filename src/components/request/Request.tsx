import { useContext, useEffect, useState } from "react";
import Table from "../table/Table";
import { useSearchParams } from "react-router-dom";
import useRequestTableData from "./useRequestTableData";
import { Wrapper, TableContentWrapper, TableSection } from "./Request.styled";
import RequestHero from "./RequestHero";
import { RequestClientContext } from "context/RequestClientContext";
import { ethers } from "ethers";
import { oracle } from "@uma/sdk";

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
  const [requestState, setRequestState] = useState<oracle.types.state.Request>(
    {} as oracle.types.state.Request
  );

  useEffect(() => {
    const r = {
      requester: ethers.utils.getAddress(
        searchParams.get("requester")?.trim() ?? ""
      ),
      identifier: searchParams.get("identifier") ?? "",
      timestamp: Number(searchParams.get("timestamp")) ?? "",
      ancillaryData: searchParams.get("ancillaryData") ?? "",
      chainId: Number(searchParams.get("chainId")) ?? 1,
    };

    client.setActiveRequest(r);
    client.update
      .all()
      .catch((err) => {
        console.log("err in set active request?", err);
      })
      .finally(() => {
        setRequestState(client.store.read().request());
      });
  }, [searchParams, client]);

  return (
    <Wrapper>
      <RequestHero
        requestState={requestState}
        chainId={Number(searchParams.get("chainId")) ?? 0}
      />
      <TableSection>
        <TableContentWrapper>
          <Table title={"Input Data"} headerCells={headerCells} rows={rows} />
        </TableContentWrapper>
      </TableSection>
    </Wrapper>
  );
};

export default Request;
