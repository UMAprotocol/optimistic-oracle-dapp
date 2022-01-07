import React from "react";

import { Link } from "react-router-dom";
import logo from "assets/logo.svg";
import { Wrapper, MaxWidth, Navigation, ConnectButton } from "./Navbar.styled";

export const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <MaxWidth>
        <Link to="/">
          <img src={logo} />
        </Link>
        <Navigation>
          <ConnectButton>Connect wallet</ConnectButton>
        </Navigation>
      </MaxWidth>
    </Wrapper>
  );
};

export default Navbar;
