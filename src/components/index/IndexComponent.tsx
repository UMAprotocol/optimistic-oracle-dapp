import { useState } from "react";
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

enum Selected {
  DEFAULT,
  REQUESTS,
  PROPOSED,
  DISPUTED,
  ANSWERED,
}

const Index = () => {
  const [filter, setFilter] = useState<Selected>(Selected.DEFAULT);
  const { state } = useClient();
  const { descendingRequests } = useReader(state);

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
            variant={filter === Selected.DEFAULT ? "primary" : "outline"}
            onClick={() => setFilter(Selected.DEFAULT)}
          >
            <div>All</div> <div>1000</div>
          </FilterButton>
          <FilterButton
            variant={filter === Selected.REQUESTS ? "primary" : "outline"}
            onClick={() => setFilter(Selected.REQUESTS)}
          >
            <div>Requests </div> <div>500</div>
          </FilterButton>
          <FilterButton
            variant={filter === Selected.PROPOSED ? "primary" : "outline"}
            onClick={() => setFilter(Selected.PROPOSED)}
          >
            <div>Proposed </div> <div>300</div>
          </FilterButton>
          <FilterButton
            variant={filter === Selected.DISPUTED ? "primary" : "outline"}
            onClick={() => setFilter(Selected.DISPUTED)}
          >
            <div>Disputed </div> <div>200</div>
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
          <RequestsTable requests={descendingRequests} />
        </TableRow>
      </Body>
    </Wrapper>
  );
};

export default Index;
