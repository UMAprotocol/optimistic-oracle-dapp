import { useContext } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
import Request from "./components/request";
import Layout from "./components/layout";
import ChangeNetwork from "components/change-network/ChangeNetwork";
import { ConnectionContext } from "context/ConnectionContext";

const Router = () => {
  const { isConnected, chainId, provider } = useContext(ConnectionContext);
  const [searchParams] = useSearchParams();
  const wrongNetwork =
    isConnected &&
    searchParams.get("chainId") &&
    Number(searchParams.get("chainId")) !== chainId;

  return (
    <>
      <GlobalStyles />
      {wrongNetwork && provider && searchParams.get("chainId") && (
        <ChangeNetwork
          provider={provider}
          chainId={Number(searchParams.get("chainId"))}
        />
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="request" element={<Request />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
