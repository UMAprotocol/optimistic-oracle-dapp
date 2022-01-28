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
  ProposerAddress,
  InputError,
} from "./Request.styled";
import { Duration } from "luxon";
import calculateTimeRemaining from "helpers/calculateTimeRemaining";
import useClient from "hooks/useOracleClient";
import useConnection from "hooks/useConnection";
import useReader from "hooks/useOracleReader";
import { ethers } from "ethers";
import { prettyFormatNumber } from "helpers/format";
import BouncingDotsLoader from "components/bouncing-dots-loader";
import { oracle } from "@uma/sdk";

const TEN_HOURS_IN_MILLSECONDS = 60 * 60 * 10 * 1000;
const TWENTY_FOUR_HOURS_IN_MILLISECONDS = 60 * 60 * 24 * 1000;
const RequestForm: FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState("");
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setValue(v);
    setInputError("");
    try {
      checkForInputError(v);
    } catch (err: any) {
      setInputError(err.message);
    }
  };
  const checkForInputError = (v: string) => {
    if (isNaN(Number(v))) {
      throw new Error("Must be a valid number.");
    }
    if (Number(v) < 0) {
      throw new Error("Must be a positive number.");
    }
    if (v.includes(".")) {
      const split = v.split(".");
      if (split[1].length > 18) {
        throw new Error("Value must not exceed currency decimals.");
      }
    }
    return false;
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
    proposedPrice,
    disputer,
    proposer,
    requestState,
    explorerUrl,
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
    if (flags.ProposalInProgress)
      return {
        label: "Proposing...",
        onClick: undefined,
        disabled: true,
      };
    if (flags.InsufficientApproval)
      return {
        label: "Approve Proposal Bond",
        onClick: () => client.approveCollateral(),
        disabled: false,
      };
    return {
      label: "Submit Proposal",
      disabled: inputError ? true : false,
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
    if (flags.DisputeInProgress)
      return {
        label: "Disputing...",
        onClick: undefined,
        disabled: true,
      };
    if (flags.InsufficientApproval)
      return {
        label: "Approve Dispute Bond",
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
    if (flags.MissingRequest) return <div>Loading Request State...</div>;
    if (
      flags.ApprovalInProgress ||
      flags.ProposalInProgress ||
      flags.DisputeInProgress
    )
      return (
        <RequestFormButton>
          <BouncingDotsLoader />
        </RequestFormButton>
      );
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
    } else if (requestState === oracle.types.state.RequestState.Disputed) {
      return <RequestFormButton disabled={true}>Disputed</RequestFormButton>;
    } else {
      return <RequestFormButton disabled={true}>Resolved</RequestFormButton>;
    }
  };

  useEffect(() => {
    if (expirationTime && flags.InDisputeState) {
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
  }, [expirationTime, liveness, flags.InDisputeState]);

  const formatLiveness = useCallback((time) => {
    if (time) {
      const millisecondsLiveness = time * 1000;
      let format = "h 'hour(s)'";
      if (millisecondsLiveness >= TEN_HOURS_IN_MILLSECONDS) {
        format = "hh 'hours'";
      }
      if (millisecondsLiveness >= TWENTY_FOUR_HOURS_IN_MILLISECONDS) {
        format = "dd 'days' hh 'hours'";
      }
      return Duration.fromMillis(millisecondsLiveness).toFormat(format);
    } else {
      return "";
    }
  }, []);

  return (
    <RequestFormWrapper>
      <RequestFormRow>
        <RequestFormHeaderAndFormWrapper>
          <FormHeader>
            {flags.InProposeState && "Proposal"}
            {flags.InDisputeState && "Dispute Period"}
            {requestState === oracle.types.state.RequestState.Disputed && (
              <>
                <div>Proposal</div>
                <div>
                  Disputed and sent to UMA's Data Verification Mechanism (DVM)
                  for resolution.{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://vote.umaproject.org"
                  >
                    View here
                  </a>
                </div>
              </>
            )}
          </FormHeader>
          <RequestFormInputWrapper>
            <RequestInputButtonBlock>
              {flags.InProposeState && (
                <RequestFormInput
                  label="Propose: "
                  value={value}
                  onChange={inputOnChange}
                />
              )}
              {(flags.InDisputeState ||
                requestState === oracle.types.state.RequestState.Disputed) &&
                proposedPrice && (
                  <RequestFormInput
                    disabled={true}
                    label="Proposed answer: "
                    value={ethers.utils.formatUnits(proposedPrice, 18)}
                    onChange={() => null}
                  />
                )}
              {getButton(value)}
            </RequestInputButtonBlock>
            {inputError && <InputError>{inputError}</InputError>}
            {flags.InDisputeState && (
              <ProposerAddress>
                Proposer:{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${explorerUrl}/tx/${proposer}`}
                >
                  {proposer}
                </a>
              </ProposerAddress>
            )}
            {flags.DisputeInProgress && (
              <ProposerAddress>
                Disputer:{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${explorerUrl}/tx/${disputer}`}
                >
                  {disputer}
                </a>
              </ProposerAddress>
            )}
          </RequestFormInputWrapper>
        </RequestFormHeaderAndFormWrapper>
        <RequestFormParametersWrapper>
          <ParametersHeader>Parameters</ParametersHeader>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Proposal bond:</ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={logo} alt="bond_img" /> {collateralSymbol}{" "}
              {totalBond ? prettyFormatNumber(Number(totalBond)) : ""}
            </ParametersValue>
          </ParametersValuesWrapper>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Proposal reward:</ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={logo} alt="bond_img" /> {collateralSymbol}{" "}
              {reward ? prettyFormatNumber(Number(reward)) : ""}
            </ParametersValue>
          </ParametersValuesWrapper>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Liveness period: </ParametersValueHeader>
            <ParametersValue>
              {formatLiveness(liveness)}{" "}
              {flags.InDisputeState && (
                <>
                  Time remaining:{" "}
                  {Duration.fromMillis(currentTime).toFormat(
                    "hh'h':mm' min' s' sec' left"
                  )}
                </>
              )}
            </ParametersValue>
          </ParametersValuesWrapper>
        </RequestFormParametersWrapper>
      </RequestFormRow>
    </RequestFormWrapper>
  );
};

export default RequestForm;
