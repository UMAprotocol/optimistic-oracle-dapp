import React from "react";

import { Link } from "react-router-dom";
import logo from "assets/logo.svg";
import { Wrapper, MaxWidth, Navigation, ConnectButton } from "./Navbar.styled";
import { useConnection } from "hooks/useConnection";
import { useOnboard } from "hooks/useOnboard";

export const Navbar: React.FC = () => {
  const { account, isConnected } = useConnection();
  const { connectWallet, resetWallet } = useOnboard();
  return (
    <Wrapper>
      <MaxWidth>
        <Link to="/">
          <img src={logo} alt="uma_logo" />
        </Link>
        <Navigation>
          <ConnectButton
            onClick={() => {
              if (!isConnected) return connectWallet();
              if (isConnected) return resetWallet();
            }}
          >
            {!isConnected
              ? "Connect wallet"
              : `${account?.substring(0, 4)}...${account?.substring(
                  account.length - 4,
                  account.length
                )}`}
          </ConnectButton>
        </Navigation>
      </MaxWidth>
    </Wrapper>
  );
};

export default Navbar;
