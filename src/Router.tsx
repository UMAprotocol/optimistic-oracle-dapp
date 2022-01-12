import { useContext } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
import Request from "./components/request";
import Layout from "./components/layout";
import { ConnectionContext } from "context/ConnectionContext";
import ChangeNetwork from "components/change-network/ChangeNetwork";
const Router = () => {
  const connection = useContext(ConnectionContext);
  const [searchParams] = useSearchParams();
  const wrongNetwork =
    connection &&
    connection.isConnected &&
    searchParams.get("chainId") &&
    Number(searchParams.get("chainId")) !== connection.chainId;

  return (
    <>
      <GlobalStyles />
      {wrongNetwork && connection.provider && searchParams.get("chainId") && (
        <ChangeNetwork
          provider={connection.provider}
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
