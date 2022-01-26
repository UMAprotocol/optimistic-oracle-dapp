import { FC, useState, useEffect, useCallback } from "react";
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
import { ChainId, CHAINS } from "constants/blockchain";

const TEN_HOURS_IN_MILLSECONDS = 60 * 60 * 10 * 1000;
const TWENTY_FOUR_HOURS_IN_MILLISECONDS = 60 * 60 * 24 * 1000;
const RequestForm: FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [value, setValue] = useState("");
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const { flags, client, state, read } = useClient();
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
  const getProposeButtonProps = (value: string) => {
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

  const getDisputeButtonProps = () => {
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
      const buttonProps = getProposeButtonProps(value);
      return (
        <RequestFormButton {...buttonProps}>
          {buttonProps.label}
        </RequestFormButton>
      );
    } else if (flags.InDisputeState) {
      const buttonProps = getDisputeButtonProps();
      return (
        <RequestFormButton {...buttonProps}>
          {buttonProps.label}
        </RequestFormButton>
      );
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

  const formatLiveness = useCallback((time) => {
    if (time) {
      const millisecondsLiveness = time * 1000;
      let format = "h'h'";
      if (millisecondsLiveness >= TEN_HOURS_IN_MILLSECONDS) {
        format = "hh'h'";
      }
      if (millisecondsLiveness >= TWENTY_FOUR_HOURS_IN_MILLISECONDS) {
        format = "dd'd'hh'h'";
      }
      return Duration.fromMillis(millisecondsLiveness).toFormat(format);
    } else {
      return "";
    }
  }, []);

  console.log("state", state);
  // console.log(client.store.read().request().proposer)
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
            {flags.InDisputeState && (
              <div>
                Proposer:{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${
                    CHAINS[(state.inputs?.request?.chainId || 1) as ChainId]
                      .explorerUrl
                  }/address/${read().request().proposer}`}
                >
                  {read().request().proposer}
                </a>
              </div>
            )}
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
              {formatLiveness(liveness)}{" "}
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
