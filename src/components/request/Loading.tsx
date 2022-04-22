import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

export const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: #eeeeef;
  svg {
    height: 56px;
    color: #272528;
  }
  > div {
    margin-top: 8px;
  }
`;

export const Loading = () => {
  return (
    <LoadingWrapper>
      <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />
      <div>Loading</div>
    </LoadingWrapper>
  );
};
