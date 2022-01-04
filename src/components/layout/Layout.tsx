import { FC } from "react";
import { Wrapper } from "./Layout.styled";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default Layout;
