import styled from "@emotion/styled";

interface ISelectStyledProps {
  isOpen?: boolean;
  isHighlighted?: boolean;
}

export const SelectContainer = styled.div`
  width: 110px;
`;

export const SelectHeader = styled.button<ISelectStyledProps>`
  padding: 10px;
  display: flex;
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.isOpen ? "#565656" : "#565656")};
  min-width: 100%;
  background-color: ${(props) => (props.isOpen ? "#fff" : "#F1F0F0")};
  color: ${(props) => (props.isOpen ? "#565656" : "#565656")};
`;

export const SelectList = styled.ul<ISelectStyledProps>`
  max-height: 200px;
  overflow-y: auto;
  margin: 12px 0 0 0;
  border-width: ${(props) => (props.isOpen ? "1px" : "0")};
  border-style: solid;
  border-color: #565656;
  background-color: #fff;
  list-style: none;
  position: absolute;
  width: 110px;
  border-radius: 8px;
  color: #565656;
  z-index: 1000;
  padding-inline-start: 0;
`;
export const SelectListItem = styled.li<ISelectStyledProps>`
  padding: 5px 10px;
  background: ${(props) => (props.isHighlighted ? "#A0AEC0" : "")};
  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &:hover {
    color: #fff;
    background-color: #ff4b4b;
  }
`;

export const Arrow = styled.span`
  position: absolute;
  margin-left: 80px;
`;

export const UpArrow = styled(Arrow)`
  opacity: 0.8;
  color: #565656;
`;

export const DownArrow = styled(Arrow)`
  color: #565656;
`;
