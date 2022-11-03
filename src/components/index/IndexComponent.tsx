import { useState, useEffect } from "react";
import {
  Wrapper,
  Header,
  HeaderTitle,
  HeaderTitleText,
  HeaderTitleTextRed,
  Logo,
  FilterButtonRow,
  FilterButton,
  FilterWrapper,
  FilterNumbers,
} from "./Index.styled";
import ooLogo from "assets/uma-oo-logo-redcirclebg.svg";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import { RequestState } from "constants/blockchain";
import { oracle } from "helpers/oracleClient";
import { addCommasOnly } from "utils/format";
import { RequestsTableWithPagination } from "./RequestsTableWithPagination";
import Select, { OptionType } from "components/select/Select";
import { ChainsEnabled } from "constants/oracleConfig";

enum Filter {
  DEFAULT,
  REQUESTS,
  PROPOSED,
  DISPUTED,
  ANSWERED,
}

type Requests = oracle.types.interfaces.Requests;
type Request = oracle.types.interfaces.Request;

interface FilteredRequests {
  all: Requests;
  requested: Requests;
  proposed: Requests;
  disputed: Requests;
  answered: Requests;
  old: Requests;
}

const initialFR: FilteredRequests = {
  all: [],
  requested: [],
  proposed: [],
  disputed: [],
  answered: [],
  old: [],
};

interface Props {
  currentPage: number;
  setCurrentPage: (x: number) => void;
  dropdownPaginationValue: OptionType;
  setDropdownPaginationValue: React.Dispatch<React.SetStateAction<OptionType>>;
}
const defaultChainSelection = {
  value: "0",
  label: "All Chains",
};
const defaultChainSelections = [defaultChainSelection, ...ChainsEnabled];

const Index = ({
  currentPage,
  setCurrentPage,
  dropdownPaginationValue,
  setDropdownPaginationValue,
}: Props) => {
  const [filter, setFilter] = useState<Filter>(Filter.DEFAULT);
  const { state } = useClient();
  const { descendingRequests } = useReader(state);
  const [filteredRequests, setFilteredRequests] = useState(initialFR);
  const [filteredChain, setFilteredChain] = useState(defaultChainSelection);
  const [chainSelections, setChainSelections] = useState(
    defaultChainSelections
  );

  useEffect(() => {
    if (!descendingRequests) return;

    const initial: {
      chainCount: Record<string, number>;
      filtered: FilteredRequests;
    } = {
      chainCount: { "0": 0 },
      filtered: {
        old: [],
        all: [],
        requested: [],
        proposed: [],
        disputed: [],
        answered: [],
      },
    };
    const nowTimestamp = parseInt((new Date().getTime() / 1000).toFixed(0));
    // subtract the seconds for 1 month
    const lastMonthTimestamp = nowTimestamp - 60 * 60 * 24 * 31;
    const nextFR = descendingRequests.reduce((result, request) => {
      // skip requests older the 1 month
      if (request.timestamp < lastMonthTimestamp) {
        result.filtered.old.push(request);
        return result;
      }
      // count requests per chain
      if (result.chainCount[request.chainId.toString()] === undefined) {
        result.chainCount[request.chainId.toString()] = 0;
      }
      result.chainCount[request.chainId.toString()]++;
      // all requests count
      result.chainCount["0"]++;

      // skip requests if specific chain is selected
      if (
        filteredChain.value !== "0" &&
        request.chainId.toString() !== filteredChain.value
      ) {
        return result;
      }

      if (ALL_FILTER(request)) {
        result.filtered.all.push(request);
      }
      if (REQUEST_FILTER(request)) {
        result.filtered.requested.push(request);
      }
      if (DISPUTE_FILTER(request)) {
        result.filtered.disputed.push(request);
      }
      if (PROPOSED_FILTER(request)) {
        result.filtered.proposed.push(request);
      }
      if (ANSWERED_FILTER(request)) {
        result.filtered.answered.push(request);
      }
      return result;
    }, initial);
    setFilteredRequests(nextFR.filtered);
    const chainSelections = defaultChainSelections.map((chainSelection) => {
      const label = `${chainSelection.label} - ${
        nextFR.chainCount[chainSelection.value] || 0
      }`;
      return {
        ...chainSelection,
        label,
      };
    });
    setChainSelections(chainSelections);
    if (process.env.REACT_APP_DEBUG && nextFR.filtered.old.length)
      console.log(
        `${nextFR.filtered.old.length} requests too old to show: `,
        nextFR.filtered.old
      );
  }, [descendingRequests, filteredChain]);

  function filterDescendingRequests(filter: Filter) {
    let fr: Requests = [];
    if (filter === Filter.PROPOSED) fr = filteredRequests.proposed;
    if (filter === Filter.REQUESTS) fr = filteredRequests.requested;
    if (filter === Filter.DISPUTED) fr = filteredRequests.disputed;
    if (filter === Filter.ANSWERED) fr = filteredRequests.answered;
    if (filter === Filter.DEFAULT) fr = filteredRequests.all;
    return fr.sort((a, b) => b.timestamp - a.timestamp);
  }

  const filteredDescendingRequests = filterDescendingRequests(filter);

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
            onClick={() => {
              setFilter(Filter.DEFAULT);
            }}
          >
            <div>All</div>{" "}
            <FilterNumbers selected={filter === Filter.DEFAULT}>
              {addCommasOnly(filteredRequests.all.length)}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.REQUESTS ? "primary" : "outline"}
            onClick={() => {
              setFilter(Filter.REQUESTS);
            }}
          >
            <div>Requests </div>{" "}
            <FilterNumbers selected={filter === Filter.REQUESTS}>
              {addCommasOnly(filteredRequests.requested.length)}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.PROPOSED ? "primary" : "outline"}
            onClick={() => {
              setFilter(Filter.PROPOSED);
            }}
          >
            <div>Proposed </div>{" "}
            <FilterNumbers selected={filter === Filter.PROPOSED}>
              {addCommasOnly(filteredRequests.proposed.length)}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.DISPUTED ? "primary" : "outline"}
            onClick={() => {
              setFilter(Filter.DISPUTED);
            }}
          >
            <div>Disputed </div>{" "}
            <FilterNumbers selected={filter === Filter.DISPUTED}>
              {addCommasOnly(filteredRequests.disputed.length)}
            </FilterNumbers>
          </FilterButton>
          <FilterButton
            variant={filter === Filter.ANSWERED ? "primary" : "outline"}
            onClick={() => {
              setFilter(Filter.ANSWERED);
            }}
          >
            <div>Settled </div>{" "}
            <FilterNumbers selected={filter === Filter.ANSWERED}>
              {addCommasOnly(filteredRequests.answered.length)}
            </FilterNumbers>
          </FilterButton>
          <Select
            items={chainSelections}
            selected={filteredChain}
            setSelected={({ value }) =>
              setFilteredChain(
                defaultChainSelections.find((s) => s.value === value) ||
                  defaultChainSelection
              )
            }
          />
        </FilterButtonRow>
      </FilterWrapper>
      {filteredDescendingRequests.length ? (
        <RequestsTableWithPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          requests={filteredDescendingRequests}
          dropdownPaginationValue={dropdownPaginationValue}
          setDropdownPaginationValue={setDropdownPaginationValue}
        />
      ) : null}
    </Wrapper>
  );
};

function ALL_FILTER(x: Request) {
  return (
    REQUEST_FILTER(x) ||
    PROPOSED_FILTER(x) ||
    DISPUTE_FILTER(x) ||
    ANSWERED_FILTER(x)
  );
}

function PROPOSED_FILTER(x: Request) {
  return x.state === RequestState.Proposed;
}

function REQUEST_FILTER(x: Request) {
  return x.state === RequestState.Requested;
}

function DISPUTE_FILTER(x: Request) {
  return x.state === RequestState.Disputed || x.state === RequestState.Resolved;
}

function ANSWERED_FILTER(x: Request) {
  return x.state === RequestState.Settled;
}

export default Index;
