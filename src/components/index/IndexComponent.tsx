import { useState, useEffect } from "react";
import {
  Wrapper,
  Header,
  HeaderTitle,
  HeaderTitleText,
  HeaderTitleTextRed,
  Body,
  TableRow,
  Logo,
  FilterButtonRow,
  FilterButton,
  FilterWrapper,
} from "./Index.styled";
import RequestsTable from "./RequestsTable";
import ooLogo from "assets/uma-oo-logo-redcirclebg.svg";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import { RequestState } from "constants/blockchain";
import { RequestIndex } from "@uma/sdk/dist/types/oracle/types/state";

enum Filter {
  DEFAULT,
  REQUESTS,
  PROPOSED,
  DISPUTED,
  ANSWERED,
}

const Index = () => {
  const [filter, setFilter] = useState<Filter>(Filter.DEFAULT);
  const { state } = useClient();
  const { descendingRequests } = useReader(state);
  const [filteredRequests, setFilteredRequests] = useState(descendingRequests);

  useEffect(() => {
    // Default state, IE: filter = Filter.DEFAULT
    let filterFunc = ALL_FILTER;
    if (filter === Filter.PROPOSED) {
      filterFunc = PROPOSED_FILTER;
    }
    if (filter === Filter.REQUESTS) {
      filterFunc = REQUEST_FILTER;
    }
    if (filter === Filter.DISPUTED) {
      filterFunc = DISPUTE_FILTER;
    }
    const fr = descendingRequests.filter(filterFunc);
    setFilteredRequests(fr);
  }, [filter, descendingRequests]);
  return (
    <Wrapper>
      <Header>
        <HeaderTitle>
          <Logo src={ooLogo} alt="oo_logo" />
          <HeaderTitleTextRed>Optimistic Oracle</HeaderTitleTextRed>{" "}
          <HeaderTitleText> Requests &amp; Proposals </HeaderTitleText>{" "}
        </HeaderTitle>
      </Header>
      <FilterWrapper>
        <FilterButtonRow>
          <FilterButton
            variant={filter === Filter.DEFAULT ? "primary" : "outline"}
            onClick={() => setFilter(Filter.DEFAULT)}
          >
            <div>All</div>{" "}
            <div>{descendingRequests.filter(ALL_FILTER).length}</div>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.REQUESTS ? "primary" : "outline"}
            onClick={() => setFilter(Filter.REQUESTS)}
          >
            <div>Requests </div>{" "}
            <div>{descendingRequests.filter(REQUEST_FILTER).length}</div>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.PROPOSED ? "primary" : "outline"}
            onClick={() => setFilter(Filter.PROPOSED)}
          >
            <div>Proposed </div>{" "}
            <div>{descendingRequests.filter(PROPOSED_FILTER).length}</div>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.DISPUTED ? "primary" : "outline"}
            onClick={() => setFilter(Filter.DISPUTED)}
          >
            <div>Disputed </div>{" "}
            <div>{descendingRequests.filter(DISPUTE_FILTER).length}</div>
          </FilterButton>
          <FilterButton variant="base">
            <input type="checkbox" />
            <div>Show Answered</div>
            <div>1200</div>
          </FilterButton>
        </FilterButtonRow>
      </FilterWrapper>
      <Body>
        <TableRow>
          <RequestsTable requests={filteredRequests} />
        </TableRow>
      </Body>
    </Wrapper>
  );
};

function ALL_FILTER(x: RequestIndex) {
  return (
    x.state === RequestState.Requested ||
    x.state === RequestState.Proposed ||
    x.state === RequestState.Disputed
  );
}

function PROPOSED_FILTER(x: RequestIndex) {
  return x.state === RequestState.Proposed;
}

function REQUEST_FILTER(x: RequestIndex) {
  return x.state === RequestState.Requested;
}

function DISPUTE_FILTER(x: RequestIndex) {
  return x.state === RequestState.Disputed || x.state === RequestState.Resolved;
}

export default Index;
