import {
  HeroSection,
  HeroHeaderRow,
  HeaderTitle,
  HeaderButtonWrapper,
  HeroContentWrapper,
  HeroButton,
} from "./Request.styled";
const RequestHero = () => {
  return (
    <HeroSection>
      <HeroContentWrapper>
        <HeroHeaderRow>
          <HeaderTitle>Optimistic Oracle Request</HeaderTitle>
          <HeaderButtonWrapper>
            <HeroButton>Polygon</HeroButton>
            <HeroButton>Request</HeroButton>
          </HeaderButtonWrapper>
        </HeroHeaderRow>
      </HeroContentWrapper>
    </HeroSection>
  );
};

export default RequestHero;
