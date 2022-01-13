import { FC } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { MaxWidthWrapper } from "components/wrappers/Wrappers";

const TempIndex: FC = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Heading>Optimistic Oracle dApp</Heading>
        <Message>Working example: </Message>
        <Link
          to={
            "/request?requester=0xb8b3583f143b3a4c2aa052828d8809b0818a16e9&identifier=0x554D415553440000000000000000000000000000000000000000000000000000&ancillaryData=0x747761704C656E6774683A33363030&timestamp=1638453600&chainId=1"
          }
        >
          Example
        </Link>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: var(--gray-700);
  color: var(--white);
  padding-top: 90px;
  height: 100%;
`;

const ContentWrapper = styled(MaxWidthWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Heading = styled.h1`
  font-weight: bold;
  font-size: ${72 / 16}rem;
  margin-top: 30px;
`;

const Message = styled.div`
  font-size: ${32 / 16}rem;
  & > span {
    color: var(--primary);
  }
`;

export default TempIndex;
