import styled from "@emotion/styled";

export const BaseButton = styled.button`
  padding: 15px;
  border-radius: 4px;
  border: 1px solid var(--borderColor);
  color: var(--textColor);
  background-color: var(--bgColor);
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  &:hover {
    color: var(--hoverTextColor);
    background-color: var(--hoverBackgroundColor);
    cursor: pointer;
  }
`;
