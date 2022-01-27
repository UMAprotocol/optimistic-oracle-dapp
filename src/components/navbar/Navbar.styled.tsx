import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import Button from "components/button";
import { MaxWidthWrapper } from "components/wrappers/Wrappers";

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

export const Slice = styled(motion.div)`
  min-height: 2px;
  background-color: var(--black);
  position: absolute;
  left: 0;
  right: 0;
`;
export const Overlay = styled(motion(DialogOverlay))`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--gray-transparent-dark);
`;
export const Content = styled(motion(DialogContent))`
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  padding: 40px 12px 12px;
`;

export const CloseButton = styled(Button)`
  width: 32px;
  height: 32px;
  position: relative;
`;

export const Wrapper = styled.header`
  height: 75px;
  padding: 30px 0 75px;
`;

export const MaxWidth = styled(MaxWidthWrapper)`
  display: flex;
  align-items: center;
`;

export const Navigation = styled.nav`
  display: revert;
  margin-left: auto;
`;

export const LinkList = styled.ol`
  display: inline-flex;
  flex-direction: column;
  font-weight: 600;
  @media ${QUERIES.laptopAndUp} {
    flex-direction: revert;
    & > *:not(:last-of-type) {
      margin-right: 32px;
    }
  }
`;

export const ListItem = styled.li`
  width: fit-content;
  transition: all ease-in 0.1s;

  &:hover {
    box-shadow: 0px 3px 0px 0px var(--primary);
  }
  @media ${QUERIES.tabletAndDown} {
    width: 95%;
    margin: 0.5rem auto;
    box-shadow: 0px 2px 0px 0px var(--gray-300);
    padding-bottom: 0.5rem;
    &:hover {
      box-shadow: none;
    }
  }
`;

export const ImageItem = styled.li`
  opacity: 1;
  transition: all ease-in 0.1s;
  &:hover {
    opacity: 0.5;
  }
`;

export const SocialsList = styled(LinkList)`
  flex-direction: row;
  & > *:not(:last-of-type) {
    margin-right: 32px;
  }
  margin-top: 16px;
  margin-left: 8px;
  @media ${QUERIES.laptopAndUp} {
    margin-left: 85px;
    margin-top: 0;
  }
`;

export const Dropdown = styled.div`
  overflow: hidden;
  width: 100%;
  button {
    font-size: 100%;
    border: none;
    outline: none;
    color: var(--black);
    font-weight: 600;
    background-color: inherit;
    font-family: inherit; /* Important for vertical align on mobile phones */
    margin: 0; /* Important for vertical align on mobile phones */
    border-bottom: 2px solid transparent;
    display: inline-block;
    height: 0.67rem;
    margin-left: 6px;
    svg {
      height: 0.75rem;
      margin-left: 4px;
      @media ${QUERIES.tabletAndDown} {
        float: right;
      }
    }

    @media ${QUERIES.tabletAndDown} {
      margin-left: 0;
      width: 100%;
    }
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #ffffff;
  min-width: 260px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 8px;
  @media ${QUERIES.tabletAndDown} {
    transform: translateX(0);
    position: relative;
    width: 100%;
    background-color: var(--white);
  }
  &.open {
    display: block;
    z-index: 999999;
    @media ${QUERIES.tabletAndDown} {
      display: block;
      width: 100%;
    }
  }

  a {
    float: none;
    color: var(--black);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    font-weight: 400;
    z-index: 99999;
    border-bottom: 1px solid var(--gray-500);

    &:hover {
      background-color: var(--gray-300);
      color: var(--primary);
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
  > div {
    @media ${QUERIES.tabletAndDown} {
      border-bottom: 1px solid var(--gray-500);
    }
  }
`;

export const ConnectButton = styled(Button)`
  background-color: #262529;
  height: 45px;
  width: 170px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 0.5rem;
  border-radius: 30px;
  &:hover {
    opacity: 0.7;
    background-color: #262529;
  }
`;

export const MobileNavigation = motion(styled(Navigation)`
  display: revert;
  @media ${QUERIES.laptopAndUp} {
    display: none;
  }
`);
