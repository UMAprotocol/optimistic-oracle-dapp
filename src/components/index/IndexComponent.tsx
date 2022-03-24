import {
  Wrapper,
  Header,
  HeaderTitle,
  HeaderTitleText,
  HeaderTitleTextRed,
  Body,
  TableRow,
  Logo,
  FilterButtonWrapper,
} from "./Index.styled";
import RequestsTable from "./RequestsTable";
import ooLogo from "assets/uma-oo-logo-redcirclebg.svg";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";

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
      <FilterButtonWrapper></FilterButtonWrapper>
      <Body>
        <TableRow>
          <RequestsTable requests={descendingRequests} />
        </TableRow>
      </Body>
    </Wrapper>
  );
};

export default Index;
