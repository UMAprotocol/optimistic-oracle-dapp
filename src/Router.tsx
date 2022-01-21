import { Routes, Route, useSearchParams } from "react-router-dom";
import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
import Request from "./components/request";
import Layout from "./components/layout";
import NotFound from "components/not-found";
import TempIndex from "components/temp-index";
import ChangeNetwork from "components/change-network/ChangeNetwork";
import useConnection from "hooks/useConnection";
import useClient from "hooks/useOracleClient";

const Router = () => {
  const { wrongNetwork  } = useConnection();
  const {client} = useClient()
  const [searchParams] = useSearchParams();

  return (
    <>
      <GlobalStyles />
      {wrongNetwork && searchParams.get("chainId") && (
        <ChangeNetwork
          switchChain={ ()=>client.switchOrAddChain() }
          chainId={Number(searchParams.get("chainId"))}
        />
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TempIndex />} />
          <Route path="request" element={<Request />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
