import styled from "@emotion/styled";
import Button from "components/button";
import Input from "components/input";

export const Wrapper = styled.div``;

/* Table Components */

export const TableSection = styled.section`
  background-color: #eeeeef;
  width: 100%;
  min-height: 30vh;
  padding: 1rem 2.5rem;
`;

export const TableContentWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const TableTitle = styled.div`
  padding-left: 1.5rem;
  padding-top: 1rem;
  display: flex;
  width: 100%;
  align-items: center;
  background: #fff;
  img {
    height: 24px;
    width: 24px;
    margin-bottom: 4px;
  }
  span {
    margin-left: 1.25rem;
    font-weight: 600;
  }
`;
/* Hero Components */

export const HeroSection = styled.section`
  background-color: #272528;
  width: 100%;
  min-height: 20vh;
  padding: 1rem 2.5rem;
`;

export const HeroContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const HeroHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

export const HeaderTitle = styled.h2`
  color: #fff;
  font-weight: 600;
  font-size: 1.5rem;
  font-family: "Halyard";
  font-weight: 600;
`;

export const HeaderButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeroButton = styled(Button)`
  background: #272528;
  height: 35px;
  border: 1px solid #fff;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 16px;
  margin: 0 0.5rem;
  min-width: 125px;
  text-transform: uppercase;
  font-family: "Halyard";
  font-weight: 400;
  font-size: 0.75rem;
  &:hover {
    cursor: initial;

    background: #272528;
    color: #fff;
  }
`;

export const HeroButtonFlex = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const HeroLogo = styled.img`
  height: 20px;
  margin-left: -4px;
`;

export const HeroButtonText = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  margin-right: 8px;
  margin-top: 2px;
`;

/* Form */

export const RequestFormWrapper = styled.div`
  background-color: #fff;
  min-height: 20vh;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem 1rem 2rem;
  font-family: "Halyard";
`;

export const RequestFormRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    margin: 0 1.5rem;
  }
`;

export const RequestFormHeaderAndFormWrapper = styled.div`
  flex-grow: 3;
`;

export const RequestFormInputWrapper = styled.div`
  background: #efefef;
  padding: 1rem 1rem 1.25rem;
  border-radius: 5px;
  label {
    color: #272528;
    font-style: normal;
    font-weight: 600;
  }
`;

export const RequestInputButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormHeader = styled.div`
  font-family: "Halyard";
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  > div:first-of-type {
    font-family: "Halyard";
    font-size: 1.25rem;
  }
  > div:nth-of-type(2) {
    font-size: 0.875rem;
    font-weight: 400;
    a {
      cursor: pointer;
      color: #ff4a4a;
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export const RequestFormInput = styled(Input)``;

export const RequestFormParametersWrapper = styled.div`
  flex-grow: 2;
`;

export const ParametersHeader = styled.h3`
  color: #272528;
  border-bottom: 1px solid #efefef;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1.75rem;
`;

export const ParametersValuesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  max-width: 500px;
  &:nth-of-type(1) {
    margin-top: 0.25rem;
  }
`;

export const ParametersValueHeader = styled.div`
  font-weight: 500;
  line-height: 1.5rem;
  margin-bottom: 0.25rem;
`;

export const ParametersValue = styled.div`
  font-weight: 400;
`;

interface IRequestFormButton {
  disabled?: boolean;
}
export const RequestFormButton = styled(Button)<IRequestFormButton>`
  opacity: ${(props) => {
    if (props.disabled) return "0.35";
    return "1";
  }};
  background-color: #ff4a4a;
  height: 50px;
  width: 230px;
  margin-top: 2.6rem;
  margin-left: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 0.5rem;
`;

export const BondLogo = styled.img`
  height: 14px;
  padding-top: 2px;
`;

export const ProposerAddress = styled.div`
  margin-left: 2px;
  margin-top: 4px;

  a {
    color: #ff4a4a;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
      opacity: 0.7;
    }
  }
`;

export const InputError = styled.div`
  background-color: #fff0f0;
  border: 1px solid #ff4a4a;
  color: #ff4a4a;
  font-weight: 600;
  font-size: 0.875rem;
  display: block;
  margin: 0 auto;
  text-align: left;
  text-indent: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  padding: 0.5rem;
  font-weight: 600;
`;

export const HeroLogoSmall = styled(HeroLogo)`
  height: 16px;
`;

export const RequestTxText = styled.div`
  font-size: ${14 / 16}rem;
  color: #fff;
  a {
    color: #ff4a4a;
    &:hover {
      opacity: 0.75;
    }
  }
`;
