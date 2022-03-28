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
  // this is the initial object
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
  const [filteredRequests, setFilteredRequests] = useState(descendingRequests);
  const [fr, setFr] = useState(initialFR);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    // Default state, IE: filter = Filter.DEFAULT
    let filterFunc = ALL_FILTER;

    if (!checked) {
      if (filter === Filter.PROPOSED) {
        filterFunc = PROPOSED_FILTER;
      }
      if (filter === Filter.REQUESTS) {
        filterFunc = REQUEST_FILTER;
      }
      if (filter === Filter.DISPUTED) {
        filterFunc = DISPUTE_FILTER;
      }
    } else {
      filterFunc = ANSWERED_FILTER;
    }

    const fr = descendingRequests.filter(filterFunc);
    setFilteredRequests(fr);
  }, [filter, descendingRequests, checked]);

  useEffect(() => {
    const filteredRequests = descendingRequests.reduce((result, request) => {
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
    }, initialFR);
    setFr(filteredRequests);
  }, [descendingRequests]);

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
              {fr.all.length}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.REQUESTS ? "primary" : "outline"}
            onClick={() => setFilter(Filter.REQUESTS)}
          >
            <div>Requests </div>{" "}
            <FilterNumbers selected={filter === Filter.REQUESTS}>
              {fr.requested.length}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.PROPOSED ? "primary" : "outline"}
            onClick={() => setFilter(Filter.PROPOSED)}
          >
            <div>Proposed </div>{" "}
            <FilterNumbers selected={filter === Filter.PROPOSED}>
              {fr.proposed.length}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.DISPUTED ? "primary" : "outline"}
            onClick={() => setFilter(Filter.DISPUTED)}
          >
            <div>Disputed </div>{" "}
            <FilterNumbers selected={filter === Filter.DISPUTED}>
              {fr.disputed.length}
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
            <ShowAnsweredText>{fr.answered.length}</ShowAnsweredText>
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

function ANSWERED_FILTER(x: RequestIndex) {
  return x.state === RequestState.Settled;
}

export default Index;
