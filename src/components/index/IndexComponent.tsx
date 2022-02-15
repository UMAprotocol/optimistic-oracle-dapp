import {
  Wrapper,
  Header,
  HeaderTitle,
  HeaderTitleText,
  HeaderTitleTextRed,
  Body,
  TableRow,
} from "./Index.styled";
import RequestsTable from "./RequestsTable";

const Index = () => {
  return (
    <Wrapper>
      <Header>
        <HeaderTitle>
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
