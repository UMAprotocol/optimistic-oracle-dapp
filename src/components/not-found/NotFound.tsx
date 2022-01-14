import { FC } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { MaxWidthWrapper } from "components/wrappers/Wrappers";

const NotFound: FC = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Heading>404</Heading>
        <Message>Page not found.</Message>
        <Link to="/">Back to Homepage</Link>
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

export default NotFound;
