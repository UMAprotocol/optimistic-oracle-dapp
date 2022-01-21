import { FC, useState, useEffect } from "react";
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
import { Duration } from "luxon";
import calculateTimeRemaining from "helpers/calculateTimeRemaining";
import useClient from "hooks/useOracleClient";
import useConnection from "hooks/useConnection";
import useReader from "hooks/useOracleReader";

const RequestForm: FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [value, setValue] = useState("");
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const { flags, client, state } = useClient();
  const { connect } = useConnection();
  const {
    totalBond,
    reward,
    collateralSymbol,
    liveness,
    logo,
    expirationTime,
  } = useReader(state);

  // TODO: update these to the correct design for text and button state
  const getProposalState = (value: string) => {
    if (flags.MissingUser)
      return {
        label: "Login",
        onClick: () => connect(),
        disabled: false,
      };
    if (flags.InsufficientBalance)
      return {
        label: "Balance Low",
        onClick: undefined,
        disabled: true,
      };
    if (flags.ChainChangeInProgress)
      return {
        label: "Changing Networks...",
        onClick: undefined,
        disabled: true,
      };
    if (flags.WrongChain)
      return {
        label: "Switch Networks",
        onClick: () => client.switchOrAddChain(),
        disabled: false,
      };
    if (flags.ApprovalInProgress)
      return {
        label: "Approving...",
        onClick: undefined,
        disabled: true,
      };
    if (flags.ProposalInProgress)
      return {
        label: "Proposing...",
        onClick: undefined,
        disabled: true,
      };
    if (flags.InsufficientApproval)
      return {
        label: "Approve",
        onClick: () => client.approveCollateral(),
        disabled: false,
      };
    return {
      label: "Submit proposal",
      disabled: false,
      onClick: () => client.proposePrice(value),
    };
  };

  const getDisputeState = () => {
    if (flags.MissingUser)
      return {
        label: "Login",
        onClick: connect,
        disabled: false,
      };
    if (flags.InsufficientBalance)
      return {
        label: "Balance Low",
        onClick: undefined,
        disabled: true,
      };
    if (flags.ChainChangeInProgress)
      return {
        label: "Changing Networks...",
        onClick: undefined,
        disabled: true,
      };
    if (flags.WrongChain)
      return {
        label: "Switch Networks",
        onClick: () => client.switchOrAddChain(),
        disabled: false,
      };
    if (flags.ApprovalInProgress)
      return {
        label: "Approving...",
        onClick: undefined,
        disabled: true,
      };
    if (flags.DisputeInProgress)
      return {
        label: "Disputing...",
        onClick: undefined,
        disabled: true,
      };
    if (flags.InsufficientApproval)
      return {
        label: "Approve",
        onClick: () => client.approveCollateral(),
        disabled: false,
      };
    return {
      label: "Submit Dispute",
      disabled: false,
      onClick: () => client.disputePrice(),
    };
  };

  const getButton = (value: string) => {
    if (flags.InProposeState) {
      const result = getProposalState(value);
      return <RequestFormButton {...result}>{result.label}</RequestFormButton>;
    } else if (flags.InDisputeState) {
      const result = getDisputeState();
      return <RequestFormButton {...result}>{result.label}</RequestFormButton>;
    } else {
      return <RequestFormButton disabled={true}>Resolved</RequestFormButton>;
    }
  };

  useEffect(() => {
    if (expirationTime) {
      setCurrentTime(calculateTimeRemaining(Date.now(), expirationTime * 1000));
      const timer = setInterval(
        () =>
          setCurrentTime(
            calculateTimeRemaining(Date.now(), expirationTime * 1000)
          ),
        1000
      );
      return () => clearInterval(timer);
    }
  }, [expirationTime, liveness]);

  // // Default to RequestState = 6 (Settled).
  // const setButtonText = useCallback(() => {
  //   if (requestState.state === RequestState.Invalid)
  //     return <>Invalid request</>;
  //   if (requestState.state === RequestState.Requested)
  //     return <>Submit proposal</>;
  //   if (requestState.state === RequestState.Proposed)
  //     return <>Dispute proposal</>;
  //   return <>Submit proposal</>;
  // }, [requestState]);

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
              {getButton(value)}
            </RequestInputButtonBlock>
          </RequestFormInputWrapper>
        </RequestFormHeaderAndFormWrapper>
        <RequestFormParametersWrapper>
          <ParametersHeader>Parameters</ParametersHeader>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Proposal bond:</ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={logo} alt="bond_img" /> {collateralSymbol}{" "}
              {totalBond}
            </ParametersValue>
          </ParametersValuesWrapper>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Proposal reward:</ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={logo} alt="bond_img" /> {collateralSymbol} {reward}
            </ParametersValue>
          </ParametersValuesWrapper>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Liveness period: </ParametersValueHeader>
            <ParametersValue>
              {liveness} :{" "}
              {`Time remaining: ${Duration.fromMillis(currentTime).toFormat(
                "hh'h':mm' min' s' sec' left"
              )})`}
            </ParametersValue>
          </ParametersValuesWrapper>
        </RequestFormParametersWrapper>
      </RequestFormRow>
    </RequestFormWrapper>
  );
};

export default RequestForm;
