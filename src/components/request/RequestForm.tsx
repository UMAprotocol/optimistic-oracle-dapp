import { FC, useState, useCallback } from "react";
import {
  RequestFormWrapper,
  RequestFormRow,
  FormHeader,
  RequestFormHeaderAndFormWrapper,
  RequestFormInputWrapper,
  RequestFormInput,
  RequestFormParametersWrapper,
  ParametersHeader,
  ParametersValuesWrapper,
  ParametersValueHeader,
  ParametersValue,
  RequestInputButtonBlock,
  RequestFormButton,
  BondLogo,
} from "./Request.styled";
import usdcLogo from "assets/usdc-logo.png";
import { IOORequest, RequestState } from "constants/blockchain";
import { ethers } from "ethers";

interface Props {
  requestState: IOORequest;
}

const RequestForm: FC<Props> = ({ requestState }) => {
  const [value, setValue] = useState("");
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  console.log("RQ", requestState);

  // Default to RequestState = 6 (Settled).
  const setButtonText = useCallback(() => {
    if (requestState.state === RequestState.Invalid)
      return <>Invalid request</>;
    if (requestState.state === RequestState.Requested)
      return <>Submit proposal</>;
    if (requestState.state === RequestState.Proposed)
      return <>Dispute proposal</>;
    return <>Submit proposal</>;
  }, [requestState]);

  return (
    <RequestFormWrapper>
      <RequestFormRow>
        <RequestFormHeaderAndFormWrapper>
          <FormHeader>Proposal</FormHeader>
          <RequestFormInputWrapper>
            <RequestInputButtonBlock>
              <RequestFormInput
                label="Propose: "
                value={value}
                onChange={inputOnChange}
              />
              <RequestFormButton disabled={true}>
                {setButtonText()}
              </RequestFormButton>
            </RequestInputButtonBlock>
          </RequestFormInputWrapper>
        </RequestFormHeaderAndFormWrapper>
        <RequestFormParametersWrapper>
          <ParametersHeader>Parameters</ParametersHeader>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Proposal bond:</ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={usdcLogo} alt="bond_img" /> FAKE{" "}
              {requestState.bond
                ? ethers.utils.formatUnits(requestState.bond, 18)
                : ""}
            </ParametersValue>
          </ParametersValuesWrapper>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Proposal reward:</ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={usdcLogo} alt="bond_img" /> FAKE
              {requestState.reward
                ? ethers.utils.formatUnits(requestState.reward, 18)
                : ""}
            </ParametersValue>
          </ParametersValuesWrapper>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Liveness period:</ParametersValueHeader>
            <ParametersValue>48 hours</ParametersValue>
          </ParametersValuesWrapper>
        </RequestFormParametersWrapper>
      </RequestFormRow>
    </RequestFormWrapper>
  );
};

export default RequestForm;
