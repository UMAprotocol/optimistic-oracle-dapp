import Table from "../table/Table";
import { useSearchParams } from "react-router-dom";
import useRequestTableData from "./useRequestTableData";
import { Wrapper, TableContentWrapper, TableSection } from "./Request.styled";
import RequestHero from "./RequestHero";
/* Search Params:
  {
    requester: string;
    identifier: string;
    ancillaryData: string;
    timestamp: number;
    chainId: number;
  } 
*/

import { oracle } from "@uma/sdk";

const multicall2Address = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696";
const optimisticOracleAddress = "0xC43767F4592DF265B4a9F1a398B97fF24F38C6A6";
const chainId = 1;
const providerUrl = process.env.REACT_APP_CUSTOM_NODE_URL ?? "";

export const config = {
  chains: {
    [chainId]: {
      chainId,
      multicall2Address,
      optimisticOracleAddress,
      providerUrl,
    },
  },
};

const client = oracle.client.factory(config, () => undefined);

console.log("client", client);

const Request = () => {
  const [searchParams] = useSearchParams();
  const { rows, headerCells } = useRequestTableData(searchParams);

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
