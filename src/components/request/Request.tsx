import { useContext, useEffect, useState } from "react";
import Table from "../table/Table";
import { useSearchParams } from "react-router-dom";
import useRequestTableData from "./useRequestTableData";
import { Wrapper, TableContentWrapper, TableSection } from "./Request.styled";
import RequestHero from "./RequestHero";
import { RequestClientContext } from "context/RequestClientContext";
import { ethers } from "ethers";
import { IOORequest } from "constants/blockchain";

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
  const [requestState, setRequestState] = useState<IOORequest>(
    {} as IOORequest
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
        console.log("log??", client.store.read().request());
        setRequestState(client.store.read().request());
      });
  }, [searchParams, client]);

  console.log("requestState", requestState);
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
