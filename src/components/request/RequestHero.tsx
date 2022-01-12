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
import polygonLogo from "assets/polygon-tag.svg";

const RequestHero = () => {
  return (
    <HeroSection>
      <HeroContentWrapper>
        <HeroHeaderRow>
          <HeaderTitle>Optimistic Oracle Request</HeaderTitle>
          <HeaderButtonWrapper>
            <HeroButton>
              <HeroButtonFlex>
                <HeroLogo src={polygonLogo} alt="polygon_logo" />
                <HeroButtonText>Polygon</HeroButtonText>
              </HeroButtonFlex>
            </HeroButton>

            <HeroButton>Request</HeroButton>
          </HeaderButtonWrapper>
        </HeroHeaderRow>
        <RequestForm></RequestForm>
      </HeroContentWrapper>
    </HeroSection>
  );
};

export default RequestHero;
