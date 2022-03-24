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
} from "./Index.styled";
import RequestsTable from "./RequestsTable";
import ooLogo from "assets/uma-oo-logo-redcirclebg.svg";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import Button from "components/button";

const Index = () => {
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
      <FilterButtonRow>
        <FilterButton>
          <div>All</div> <div>1000</div>
        </FilterButton>
        <FilterButton variant="outline">
          <div>Requests </div> <div>500</div>
        </FilterButton>
        <FilterButton variant="outline">
          <div>Proposed </div> <div>300</div>
        </FilterButton>
        <FilterButton variant="outline">
          <div>Disputed </div> <div>200</div>
        </FilterButton>
      </FilterButtonRow>
      <Body>
        <TableRow>
          <RequestsTable requests={descendingRequests} />
        </TableRow>
      </Body>
    </Wrapper>
  );
};

export default Index;
