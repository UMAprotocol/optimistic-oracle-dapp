import {
  RequestFormWrapper,
  RequestFormRow,
  FormHeader,
  RequestFormHeaderAndFormWrapper,
  RequestFormInputWrapper,
} from "./Request.styled";

const RequestForm = () => {
  return (
    <RequestFormWrapper>
      <RequestFormRow>
        <RequestFormHeaderAndFormWrapper>
          <FormHeader>Proposal</FormHeader>
          <RequestFormInputWrapper></RequestFormInputWrapper>
        </RequestFormHeaderAndFormWrapper>
      </RequestFormRow>
    </RequestFormWrapper>
  );
};

export default RequestForm;
