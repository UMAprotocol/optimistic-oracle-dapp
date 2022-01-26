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
import { ChainId, CHAINS } from "constants/blockchain";
import { ethers } from "ethers";
import { prettyFormatNumber } from "helpers/format";

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
    checkForInputError(v);
  };
  const checkForInputError = (v: string) => {
    if (isNaN(Number(v))) {
      return setInputError("Must be a valid number.");
    }
    if (v.includes(".") && read().collateralProps().decimals) {
      const split = v.split(".");
      const decs = read().collateralProps().decimals;
      if (decs && split[1].length > decs) {
        return setInputError("Value must not exceed currency decimals.");
      }
    }
    return false;
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

  const [raceCond, setRaceCond] = useState(false);

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

  // Temp. This throws if you try to read certain values too quickly.
  // TODO: Add proper loader.
  useEffect(() => {
    setTimeout(() => {
      setRaceCond(true);
    }, 2000);
  }, []);

  return (
    <RequestFormWrapper>
      <RequestFormRow>
        <RequestFormHeaderAndFormWrapper>
          <FormHeader>
            {flags.InProposeState && "Proposal"}
            {(flags.InDisputeState || flags.DisputeInProgress) &&
              "Dispute Period"}
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
              {flags.InDisputeState && raceCond && (
                <RequestFormInput
                  disabled={true}
                  label="Proposed answer: "
                  value={ethers.utils.formatUnits(
                    read().request().proposedPrice,
                    read().collateralProps().decimals
                  )}
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
                  href={`${
                    CHAINS[(state.inputs?.request?.chainId || 1) as ChainId]
                      .explorerUrl
                  }/tx/${read().request().proposer}`}
                >
                  {read().request().proposer}
                </a>
              </ProposerAddress>
            )}
            {flags.DisputeInProgress && (
              <ProposerAddress>
                Disputer:{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${
                    CHAINS[(state.inputs?.request?.chainId || 1) as ChainId]
                      .explorerUrl
                  }/tx/${read().request().disputer}`}
                >
                  {read().request().disputer}
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
