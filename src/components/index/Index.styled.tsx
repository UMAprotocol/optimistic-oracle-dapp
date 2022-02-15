import styled from "@emotion/styled";

export const Wrapper = styled.div`
  background-color: #efefef;
  min-height: 100vh;
  padding-bottom: 1rem;
`;

export const Header = styled.div`
  background-color: #272528;
`;

export const HeaderTitle = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 0;
`;

export const HeaderTitleText = styled.span`
  font-size: 2rem;
  font-family: "Halyard";
  font-weight: 600;
  color: #fff;
`;

export const HeaderTitleTextRed = styled(HeaderTitleText)`
  color: #ff4a4a;
  margin-right: 4px;
`;

export const Body = styled.div`
  background-color: #efefef;
`;

export const TableRow = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
`;
