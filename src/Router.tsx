import { useContext, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
import Request from "./components/request";
import Layout from "./components/layout";
import NotFound from "components/not-found";
import TempIndex from "components/temp-index";
import ChangeNetwork from "components/change-network/ChangeNetwork";
import { RequestClientContext } from "context/RequestClientContext";
import useConnection from "hooks/useConnection";

/* export enum RequestState {
  Invalid = 0, // Never requested.
  Requested, // Requested, no other actions taken.
  Proposed, // Proposed, but not expired or disputed yet.
  Expired, // Proposed, not disputed, past liveness.
  Disputed, // Disputed, but no DVM price returned yet.
  Resolved, // Disputed and DVM price is available.
  Settled, // Final price has been set in the contract (can get here from Expired or Resolved).
}
*/

const Router = () => {
  const { isConnected, chainId, provider, account, signer } = useConnection();
  const client = useContext(RequestClientContext);

  const [searchParams] = useSearchParams();
  const wrongNetwork =
    isConnected &&
    searchParams.get("chainId") &&
    Number(searchParams.get("chainId")) !== chainId;

  useEffect(() => {
    if (isConnected && account && signer && chainId) {
      console.log("in here?", chainId);
      client.setUser(account, chainId, signer);
      client.update
        .all()
        .then(() => client.store.read().userChainId)
        .catch((err) => console.log("err in setuser effect?", err));
    }
  }, [isConnected, account, signer, chainId, client]);
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
          <Route index element={<TempIndex />} />
          <Route path="request" element={<Request />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
