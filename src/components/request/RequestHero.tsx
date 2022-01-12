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
} from "./Request.styled";
import { CHAINS, ChainId } from "constants/web3";

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

            <HeroButton>Request</HeroButton>
          </HeaderButtonWrapper>
        </HeroHeaderRow>
        <RequestForm />
      </HeroContentWrapper>
    </HeroSection>
  );
};

export default RequestHero;
