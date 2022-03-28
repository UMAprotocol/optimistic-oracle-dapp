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
  FilterNumbers,
  ShowAnsweredText,
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

interface FilteredRequests {
  all: RequestIndex[];
  requested: RequestIndex[];
  proposed: RequestIndex[];
  disputed: RequestIndex[];
  answered: RequestIndex[];
}

const initialFR: FilteredRequests = {
  all: [],
  requested: [],
  proposed: [],
  disputed: [],
  answered: [],
};

const Index = () => {
  const [filter, setFilter] = useState<Filter>(Filter.DEFAULT);
  const { state } = useClient();
  const { descendingRequests } = useReader(state);
  const [filteredRequests, setFilteredRequests] = useState(initialFR);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const initial: FilteredRequests = {
      all: [],
      requested: [],
      proposed: [],
      disputed: [],
      answered: [],
    };

    const nextFR = descendingRequests.reduce((result, request) => {
      if (ALL_FILTER(request)) {
        result.all.push(request);
      }
      if (REQUEST_FILTER(request)) {
        result.requested.push(request);
      }
      if (DISPUTE_FILTER(request)) {
        result.disputed.push(request);
      }
      if (PROPOSED_FILTER(request)) {
        result.proposed.push(request);
      }
      if (ANSWERED_FILTER(request)) {
        result.answered.push(request);
      }
      return result;
    }, initial);

    setFilteredRequests(nextFR);
  }, [descendingRequests]);

  function filterDescendingRequests(checked: boolean, filter: Filter) {
    if (checked) return filteredRequests.answered;
    if (filter === Filter.PROPOSED) return filteredRequests.proposed;
    if (filter === Filter.REQUESTS) return filteredRequests.requested;
    if (filter === Filter.DISPUTED) return filteredRequests.disputed;
    return filteredRequests.all;
  }

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
            <FilterNumbers selected={filter === Filter.DEFAULT}>
              {filteredRequests.all.length}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.REQUESTS ? "primary" : "outline"}
            onClick={() => setFilter(Filter.REQUESTS)}
          >
            <div>Requests </div>{" "}
            <FilterNumbers selected={filter === Filter.REQUESTS}>
              {filteredRequests.requested.length}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.PROPOSED ? "primary" : "outline"}
            onClick={() => setFilter(Filter.PROPOSED)}
          >
            <div>Proposed </div>{" "}
            <FilterNumbers selected={filter === Filter.PROPOSED}>
              {filteredRequests.proposed.length}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.DISPUTED ? "primary" : "outline"}
            onClick={() => setFilter(Filter.DISPUTED)}
          >
            <div>Disputed </div>{" "}
            <FilterNumbers selected={filter === Filter.DISPUTED}>
              {filteredRequests.disputed.length}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            onClick={() => setChecked((prevValue) => !prevValue)}
            variant="base"
          >
            <input
              checked={checked}
              type="checkbox"
              onChange={(event) => setChecked(event.target.checked)}
            />
            <span>
              <span />
              <span />
            </span>
            <ShowAnsweredText>Show Answered</ShowAnsweredText>
            <ShowAnsweredText>
              {filteredRequests.answered.length}
            </ShowAnsweredText>
          </FilterButton>
        </FilterButtonRow>
      </FilterWrapper>
      <Body>
        <TableRow>
          <RequestsTable requests={filterDescendingRequests(checked, filter)} />
        </TableRow>
      </Body>
    </Wrapper>
  );
};

function ALL_FILTER(x: RequestIndex) {
  return REQUEST_FILTER(x) || PROPOSED_FILTER(x) || DISPUTE_FILTER(x);
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

function ANSWERED_FILTER(x: RequestIndex) {
  return x.state === RequestState.Settled;
}

export default Index;
