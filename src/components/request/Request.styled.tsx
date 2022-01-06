import styled from "@emotion/styled";
import Button from "../button/Button";
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
  max-width: 1700px;
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
  max-width: 1700px;
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
  padding: 1rem;
`;

export const RequestFormRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const RequestFormHeaderAndFormWrapper = styled.div`
  flex-grow: 3;
`;

export const RequestFormInputWrapper = styled.div`
  background: #efefef;
`;

export const FormHeader = styled.h2`
  font-family: "Halyard";
  font-weight: 700;
  font-size: 1.25rem;
`;
