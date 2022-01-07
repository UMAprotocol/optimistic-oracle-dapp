import React from "react";

import { Link } from "react-router-dom";
import Logo from "/public/logo.svg";
import { Wrapper, MaxWidth } from "./Navbar.styled";

export const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <MaxWidth>
        <Link to="/">
          <Logo />
        </Link>
      </MaxWidth>
    </Wrapper>
  );
};

export default Navbar;
