import styled from "@emotion/styled";
import Button from "components/button";
export const Wrapper = styled.div`
  background-color: #efefef;
  height: 100%;
  padding-bottom: 1rem;
  min-height: 90vh;
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

export const FilterWrapper = styled.div`
  background-color: #fff;
  padding: 1.5rem 0 1rem;
`;

export const FilterButtonRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const FilterButton = styled(Button)`
  width: 140px;
  margin: 0 4px;
  height: 40px;
  line-height: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${15 / 16}rem;
  background-color: ${(props) => {
    if (props.variant === "primary") return "#FF4D4D";
    if (props.variant === "outline") return "#f5f4f4";
  }};

  border-color: ${(props) => {
    if (props.variant === "primary") return "#FF4D4D";
    if (props.variant === "outline") return "#F5F4F4";
  }};
  color: ${(props) => {
    if (props.variant === "primary") return "#fff";
    if (props.variant === "outline") return "#3E3C3F";
  }};
  > div {
    line-height: 4px;
  }
  &:first-of-type {
    margin-left: 16px;
  }
  &:last-of-type {
    background-color: #f5f4f4;
    color: #272528;
    margin-left: auto;
    width: 200px;
    margin-right: 8px;
    input[type="checkbox"] {
      display: none;
    }
    input[type="checkbox"] + span {
      display: inline-block;
      position: relative;
      width: 18px;
      height: 18px;
      margin: 5px 0px 0 0;
      vertical-align: middle;
      background: #fff left top no-repeat;
      border: 1px solid #ccc;
      cursor: pointer;
      > span {
        display: none;
      }
    }
    input[type="checkbox"]:checked + span {
      background: #0073cd -19px top no-repeat;
      span:first-of-type {
        position: absolute;
        display: block;
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }
`;

interface IFilterNumbers {
  selected?: boolean;
}

export const FilterNumbers = styled.div<IFilterNumbers>`
  /* height: 16px; */
  padding: 6px 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? "#FE7677" : "#E1E1E0")};
  color: ${(props) => (props.selected ? "#FEFEFF" : "#3E3C3F")};
`;

export const ShowAnsweredText = styled.div`
  margin-top: 4px;
`;
