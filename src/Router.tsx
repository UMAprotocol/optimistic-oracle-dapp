import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
import Request from "./components/request";
import Layout from "./components/layout";
import NotFound from "components/not-found";
import Index from "components/index";
import ChangeNetwork from "components/change-network/ChangeNetwork";
import useConnection from "hooks/useConnection";
import useClient from "hooks/useOracleClient";
import useRequestParams from "hooks/useRequestParams";

const Router = () => {
  const { wrongNetwork } = useConnection();
  const { client } = useClient();
  const { request } = useRequestParams();
  // pulled this into router so that you dont lose your page number when you go to details page.
  const [currentPage, setCurrentPage] = useState<number>(0);
  return (
    <>
      <GlobalStyles />
      {wrongNetwork && request && (
        <ChangeNetwork
          switchChain={() => client.switchOrAddChain()}
          chainId={request.chainId}
        />
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Index
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            }
          />
          <Route path="request" element={<Request />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
