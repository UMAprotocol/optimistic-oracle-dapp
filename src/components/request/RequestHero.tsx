import {
  HeroSection,
  HeroHeaderRow,
  HeaderTitle,
  HeaderButtonWrapper,
  HeroContentWrapper,
} from "./Request.styled";
const RequestHero = () => {
  return (
    <HeroSection>
      <HeroContentWrapper>
        <HeroHeaderRow>
          <HeaderTitle>Optimistic Oracle Request</HeaderTitle>
          <HeaderButtonWrapper></HeaderButtonWrapper>
        </HeroHeaderRow>
      </HeroContentWrapper>
    </HeroSection>
  );
};

export default RequestHero;
