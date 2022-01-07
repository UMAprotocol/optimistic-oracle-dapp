import React from "react";

import { Link } from "react-router-dom";
import logo from "assets/logo.svg";
import { Wrapper, MaxWidth, Navigation, ProductsButton } from "./Navbar.styled";

export const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <MaxWidth>
        <Link to="/">
          <img src={logo} />
        </Link>
        <Navigation>
          <ProductsButton>Connect wallet</ProductsButton>
        </Navigation>
      </MaxWidth>
    </Wrapper>
  );
};

export default Navbar;
