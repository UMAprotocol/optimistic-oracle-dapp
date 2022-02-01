import { FC } from "react";
import RequestForm from "./RequestForm";

import {
  HeroSection,
  HeroHeaderRow,
  HeaderTitle,
  HeaderButtonWrapper,
  HeroContentWrapper,
  HeroButton,
  HeroLogo,
  HeroButtonText,
  HeroButtonFlex,
  HeroLogoSmall,
} from "./Request.styled";
import { CHAINS, ChainId } from "constants/blockchain";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import alertIcon from "assets/alert-icon.svg";

interface Props {
  chainId: ChainId;
}

const RequestHero: FC<Props> = ({ chainId }) => {
  let logo = CHAINS[1].logoURI,
    chainName = CHAINS[1].name;

  if (chainId) {
    logo = CHAINS[chainId].logoURI;
    chainName = CHAINS[chainId].name;
  }
  const { oracle, state } = useClient();
  const { requestState } = useReader(state);

  return (
    <HeroSection>
      <HeroContentWrapper>
        <HeroHeaderRow>
          <HeaderTitle>Optimistic Oracle Request</HeaderTitle>
          <HeaderButtonWrapper>
            <HeroButton>
              <HeroButtonFlex>
                <HeroLogo src={logo} alt="polygon_logo" />
                <HeroButtonText>{chainName}</HeroButtonText>
              </HeroButtonFlex>
            </HeroButton>

            <HeroButton>
              {requestState === oracle.types.state.RequestState.Requested ? (
                "Request"
              ) : requestState === oracle.types.state.RequestState.Disputed ||
                requestState === oracle.types.state.RequestState.Proposed ||
                requestState === oracle.types.state.RequestState.Resolved ? (
                <HeroButtonFlex>
                  <HeroLogoSmall src={alertIcon} alt="alert_icon" />
                  <HeroButtonText>Disputed</HeroButtonText>
                </HeroButtonFlex>
              ) : (
                "Proposal"
              )}
            </HeroButton>
          </HeaderButtonWrapper>
        </HeroHeaderRow>
        <RequestForm />
      </HeroContentWrapper>
    </HeroSection>
  );
};

export default RequestHero;
