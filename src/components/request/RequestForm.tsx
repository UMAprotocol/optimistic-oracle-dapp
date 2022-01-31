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
import { NULL_ADDRESS } from "constants/blockchain";
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
    explorerUrl,
  } = useReader(state);

  // TODO: update these to the correct design for text and button state
  const getProposeButtonProps = (value: string) => {
    if (flags.MissingUser)
      return {
        label: "Connect wallet",
        onClick: () => connect(),
        disabled: false,
      };
    if (flags.InsufficientBalance)
      return {
        label: "Insufficient funds",
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
    if (flags.ProposalTxInProgress)
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
        label: "Connect wallet",
        onClick: connect,
        disabled: false,
      };
    if (flags.InsufficientBalance)
      return {
        label: "Insufficient funds",
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
    if (flags.DisputeTxInProgress)
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
      flags.ApprovalTxInProgress ||
      flags.ProposalTxInProgress ||
      flags.DisputeTxInProgress
    )
      return (
        <RequestFormButton>
          <BouncingDotsLoader />
        </RequestFormButton>
      );
    if (flags.CanPropose) {
      const buttonProps = getProposeButtonProps(value);
      return (
        <RequestFormButton {...buttonProps}>
          {buttonProps.label}
        </RequestFormButton>
      );
    } else if (flags.CanDispute) {
      const buttonProps = getDisputeButtonProps();
      return (
        <RequestFormButton {...buttonProps}>
          {buttonProps.label}
        </RequestFormButton>
      );
    } else if (flags.InDvmVote) {
      return <RequestFormButton disabled={true}>Disputed</RequestFormButton>;
    } else {
      // TODO later: Settle functionality.
      return <RequestFormButton disabled={true}>Settle</RequestFormButton>;
    }
  };

  useEffect(() => {
    if (expirationTime && flags.CanDispute) {
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
  }, [expirationTime, liveness, flags.CanDispute]);

  return (
    <RequestFormWrapper>
      <RequestFormRow>
        <RequestFormHeaderAndFormWrapper>
          <FormHeader>
            {flags.CanPropose && "Proposal"}
            {flags.CanDispute && "Dispute Period"}
            {flags.InDvmVote && (
              <>
                <div>Dispute Period</div>
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
            {flags.CanSettle && "Settle"}
          </FormHeader>
          <RequestFormInputWrapper>
            <RequestInputButtonBlock>
              {flags.CanPropose && (
                <RequestFormInput
                  label="Propose: "
                  value={value}
                  onChange={inputOnChange}
                />
              )}
              {(flags.CanDispute || flags.InDvmVote || flags.CanSettle) &&
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
            {(flags.CanDispute || flags.InDvmVote) && (
              <ProposerAddress>
                Proposer:{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${explorerUrl}/address/${proposer}`}
                >
                  {proposer}
                </a>
              </ProposerAddress>
            )}
            {(flags.CanDispute || flags.InDvmVote) &&
              disputer &&
              disputer !== NULL_ADDRESS && (
                <ProposerAddress>
                  Disputer:{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${explorerUrl}/address/${disputer}`}
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
            <ParametersValueHeader>
              {flags.CanPropose
                ? "Proposal bond"
                : flags.CanDispute || flags.InDvmVote || flags.CanSettle
                ? "Disputer bond"
                : ""}
            </ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={logo} alt="bond_img" /> {collateralSymbol}{" "}
              {totalBond ? prettyFormatNumber(Number(totalBond)) : ""}
            </ParametersValue>
          </ParametersValuesWrapper>
          <ParametersValuesWrapper>
            <ParametersValueHeader>
              {flags.CanPropose
                ? "Proposal reward"
                : flags.CanDispute || flags.InDvmVote || flags.CanSettle
                ? "Disputer reward"
                : ""}
            </ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={logo} alt="bond_img" /> {collateralSymbol}{" "}
              {reward ? prettyFormatNumber(Number(reward)) : ""}
            </ParametersValue>
          </ParametersValuesWrapper>
          {flags.CanDispute || flags.InDvmVote || flags.CanSettle ? (
            <ParametersValuesWrapper>
              <ParametersValueHeader>Sponsor Reward</ParametersValueHeader>
              <ParametersValue>
                <BondLogo src={logo} alt="bond_img" /> {collateralSymbol}{" "}
                {reward ? prettyFormatNumber(Number(reward)) : ""}
              </ParametersValue>
            </ParametersValuesWrapper>
          ) : null}
          <ParametersValuesWrapper>
            {flags.CanDispute && (
              <ParametersValueHeader>Liveness period: </ParametersValueHeader>
            )}
            <ParametersValue>
              {flags.CanDispute && (
                <>
                  Time remaining:{" "}
                  {Duration.fromMillis(currentTime).toFormat(
                    "hh 'h' mm' min' s' sec' left"
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
