import {
  Wrapper,
  Header,
  HeaderTitle,
  HeaderTitleText,
  HeaderTitleTextRed,
  Body,
  TableRow,
  Logo,
} from "./Index.styled";
import RequestsTable from "./RequestsTable";
import ooLogo from "assets/uma-oo-logo-redcirclebg.svg";

const Index = () => {
  return (
    <Wrapper>
      <Header>
        <HeaderTitle>
          <Logo src={ooLogo} alt="oo_logo" />
          <HeaderTitleTextRed>Optimistic Oracle</HeaderTitleTextRed>{" "}
          <HeaderTitleText> Requests &amp; Proposals </HeaderTitleText>{" "}
        </HeaderTitle>
      </Header>
      <Body>
        <TableRow>
          <RequestsTable />
        </TableRow>
      </Body>
    </Wrapper>
  );
};

export default Index;
