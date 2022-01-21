import { useState } from "react";
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
import useClient from 'hooks/useOracleClient'
import useConnection from 'hooks/useConnection'

const RequestForm = () => {
  const [value, setValue] = useState("");
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const {flags, client} = useClient()
  const {connect} = useConnection()

  function getButton(value:string){

    let label = 'Submit proposal'
    let disabled = false
    let onClick: undefined | (()=>any) = ()=>client.proposePrice(value)

    if(flags.ApprovalInProgress){
      label = 'Waiting on Approval'
      disabled = true
      onClick = undefined
    } else if(flags.ProposalInProgress){
      label = 'Waiting on Proposal'
      disabled = true
      onClick = undefined
    } else if(flags.ChainChangeInProgress){
      label = 'Changing Network'
      disabled = true
      onClick = undefined
    } else if(flags.MissingUser){
      label = 'Connect Wallet'
      onClick = ()=>connect().catch(console.error);
    } else if(flags.WrongChain){
      label = 'Change Network'
      onClick = ()=>client.switchOrAddChain();
    }else if(flags.InsufficientApproval){
      label = 'Approve'
      onClick = ()=>client.approveCollateral()
    } else if(flags.InsufficientBalance){
      label = 'Insufficient Balance'
      disabled = true
      onClick = undefined
    }
    return <RequestFormButton disabled={disabled} onClick={onClick}>
      {label}
    </RequestFormButton>
  }

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
              { getButton(value)}
            </RequestInputButtonBlock>
          </RequestFormInputWrapper>
        </RequestFormHeaderAndFormWrapper>
        <RequestFormParametersWrapper>
          <ParametersHeader>Parameters</ParametersHeader>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Proposal bond:</ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={usdcLogo} alt="bond_img" /> USDC 10000
            </ParametersValue>
          </ParametersValuesWrapper>
          <ParametersValuesWrapper>
            <ParametersValueHeader>Proposal reward:</ParametersValueHeader>
            <ParametersValue>
              <BondLogo src={usdcLogo} alt="bond_img" /> USDC 1000
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
