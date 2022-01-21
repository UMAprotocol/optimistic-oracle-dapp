import { FC, useState, useCallback, useEffect } from "react";
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
import { DateTime, Duration } from "luxon";
import calculateTimeRemaining from "helpers/calculateTimeRemaining";
import useConnection from "hooks/useConnection";

interface Props {
  requestState: IOORequest;
}

const TWO_HOURS = 60 * 60 * 2;

const RequestForm: FC<Props> = ({ requestState }) => {
  const [value, setValue] = useState("");
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const { isConnected } = useConnection();

  let startTime = 0;
  if (requestState.expirationTime && requestState.customLiveness) {
    if (requestState.customLiveness.toNumber() === 0) {
      startTime = requestState.expirationTime.toNumber() + TWO_HOURS;
    } else {
      startTime = requestState.customLiveness.toNumber();
    }
  }

  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    if (requestState.expirationTime) {
      setCurrentTime(
        calculateTimeRemaining(
          Date.now(),
          requestState.expirationTime.toNumber() * 1000
        )
      );
      const timer = setInterval(
        () =>
          setCurrentTime(
            calculateTimeRemaining(
              Date.now(),
              requestState.expirationTime.toNumber() * 1000
            )
          ),
        1000
      );
      return () => clearInterval(timer);
    }
  }, [requestState.expirationTime, requestState.customLiveness]);

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
              <RequestFormButton disabled={isConnected ? false : true}>
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
            <ParametersValue>
              {requestState.customLiveness &&
              requestState.customLiveness.toString() !== "0"
                ? `${DateTime.fromSeconds(
                    requestState.customLiveness.toNumber()
                  )}`
                : `2 hours (Time remaining: ${Duration.fromMillis(
                    currentTime
                  ).toFormat("hh'h':mm'min' s'sec' left")})`}
            </ParametersValue>
          </ParametersValuesWrapper>
        </RequestFormParametersWrapper>
      </RequestFormRow>
    </RequestFormWrapper>
  );
};

//       text = Duration.fromMillis(timeLeft).toFormat("hh'h':mm'min' s'sec' left");

export default RequestForm;
