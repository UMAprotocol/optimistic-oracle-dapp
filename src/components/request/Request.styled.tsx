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
  font-weight: 700;
`;

export const HeaderButtonWrapper = styled.div``;

export const HeroButton = styled(Button)`
  background: #272528;
  height: 35px;
  border: 1px solid #fff;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 16px;
  margin: 0 0.5rem;
  min-width: 115px;
  text-transform: uppercase;
  font-family: "Halyard";
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: #272528;
  }
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
    font-weight: 700;
  }
`;

export const RequestInputButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormHeader = styled.h2`
  font-family: "Halyard";
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

export const RequestFormInput = styled(Input)``;

export const RequestFormParametersWrapper = styled.div`
  flex-grow: 2;
`;

export const ParametersHeader = styled.h3`
  color: #272528;
  border-bottom: 1px solid #efefef;
  font-weight: 700;
  font-size: 1rem;
  margin-top: 1.75rem;
`;

export const ParametersValuesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  max-width: 400px;
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
  background-color: #272258;
  height: 50px;
  width: 225px;
  margin-top: 2.6rem;
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 0.5rem;
`;
