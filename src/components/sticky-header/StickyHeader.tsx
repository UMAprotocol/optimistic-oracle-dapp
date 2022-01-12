import styled from "@emotion/styled";

const StickyHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 60px;
  color: hsl(0deg 0% 0%);
  background-color: hsl(11deg 92% 70%);
  border-bottom: 1px solid hsl(0deg 0% 89%);

  & button {
    background-color: inherit;
    font-size: inherit;
    color: hsl(0deg 0% 0%);
    text-decoration: underline;
    cursor: pointer;
    border: none;
    padding: 0;
    margin: 0;
    display: inline-flex;
    &:hover {
      color: hsl(0deg 0% 89%);
    }
  }
`;

export default StickyHeader;
