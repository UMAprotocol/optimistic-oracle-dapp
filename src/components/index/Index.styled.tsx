import styled from "@emotion/styled";
import Button from "components/button";
export const Wrapper = styled.div`
  background-color: #efefef;
  height: 100%;
  padding-bottom: 1rem;
`;

export const Header = styled.div`
  background-color: #272528;
`;

export const HeaderTitle = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 40px;
`;

export const HeaderTitleText = styled.span`
  font-size: 2.25rem;
  font-family: "Halyard";
  font-weight: 600;
  color: #fff;
`;

export const HeaderTitleTextRed = styled(HeaderTitleText)`
  color: #ff4a4a;
  margin-right: 6px;
  margin-left: 4.5rem;
`;

export const Body = styled.div`
  background-color: #efefef;
`;

export const TableRow = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 40px;
`;

export const Logo = styled.img`
  position: absolute;
  margin-top: 4px;
  margin-left: 8px;
  height: 45px;
`;

export const FilterButtonRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  max-width: 1325px;
  margin: 1rem auto;
`;

export const FilterButton = styled(Button)`
  width: 140px;
  margin: 0 4px;
  height: 30px;
  line-height: 0px;
  display: flex;
  justify-content: space-between;
  > div {
    line-height: 0;
  }
  &:last-of-type {
    margin-left: auto;
    width: 200px;
    input {
      margin-top: -6px;
    }
  }
`;
