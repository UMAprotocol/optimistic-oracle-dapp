import {
  Wrapper,
  Header,
  HeaderTitle,
  HeaderTitleText,
  HeaderTitleTextRed,
  TableWrapper,
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
      <TableWrapper>
        <RequestsTable />
      </TableWrapper>
    </Wrapper>
  );
};

export default Index;
