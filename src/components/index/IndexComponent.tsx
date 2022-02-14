import {
  Wrapper,
  Header,
  HeaderTitle,
  HeaderTitleText,
  HeaderTitleTextRed,
} from "./Index.styled";
const Index = () => {
  return (
    <Wrapper>
      <Header>
        <HeaderTitle>
          <HeaderTitleTextRed>Optimistic Oracle</HeaderTitleTextRed>{" "}
          <HeaderTitleText> Requests &amp; Proposals </HeaderTitleText>{" "}
        </HeaderTitle>
      </Header>
    </Wrapper>
  );
};

export default Index;
