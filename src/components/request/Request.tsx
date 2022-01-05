import Table from "../table/Table";
import { useSearchParams } from "react-router-dom";
import useRequestTableData from "./useRequestTableData";
import { Wrapper } from "./Request.styled";
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
  const [searchParams] = useSearchParams();
  const { rows, headerCells } = useRequestTableData(searchParams);

  return (
    <Wrapper>
      <Table title={"Input Data"} headerCells={headerCells} rows={rows} />
    </Wrapper>
  );
};

export default Request;
