import styled from "@emotion/styled";
import { LabelPlacement } from "./Input";

const BREAKPOINTS = {
  tabletMin: 550,
  laptopMin: 1100,
  desktopMin: 1500,
};

const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
  tabletAndDown: `(max-width: ${(BREAKPOINTS.laptopMin - 1) / 16}rem)`,
};

interface IStyledInput {
  inputWidth?: string;
}

export const StyledInput = styled.div<IStyledInput>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.inputWidth ? `${props.inputWidth}` : "100%")};
  input {
    min-height: 25px;
    background-color: #fff;
    border: 1px solid #d4d3d4;
    width: ${(props) => (props.inputWidth ? `${props.inputWidth}` : "100%")};
    margin-left: 16px;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    &:first-child {
      margin-left: -8px;
    }
    &:nth-child(2) {
      margin-left: 8px;
    }
    &:focus {
      background-color: #fff;
      color: #ff4d4c;
      outline-color: #ff4d4c;
    }
    @media ${QUERIES.tabletAndUp} {
      padding: 1rem 1.25rem;
      &:first-child,
      &:nth-child(2) {
        margin-left: 0;
      }
    }
  }
`;

interface ILabel {
  labelPlacement?: LabelPlacement;
}

export const Label = styled.label<ILabel>`
  width: 100%;
  padding-left: 4px;
  margin-bottom: 1rem;
  font-weight: 400;
  font-size: 16px;
  ${(props) =>
    props.labelPlacement === ("overlap" as LabelPlacement) &&
    `position: absolute;
    margin-top: -8px;
    margin-bottom: 0;
    margin-left: 18px;
    background: #fff;
    width: 90px;
    text-align: center;
    border-radius: 8px;
    text-transform: uppercase;
    font-size: 12px;
    pointer-events: none;
`}
`;
