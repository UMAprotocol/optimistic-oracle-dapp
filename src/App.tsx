import assert from 'assert'
import { Routes, Route } from "react-router-dom";
import Request from "./components/request";
import Layout from "./components/layout";
import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
import { ConnectionProvider } from "./context/ConnectionContext";

import { oracle } from '@uma/sdk'

const multicall2Address = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696";
const optimisticOracleAddress = "0xC43767F4592DF265B4a9F1a398B97fF24F38C6A6";
const providerUrl = process.env.REACT_APP_CUSTOM_NODE_URL;
const chainId = 1;
assert(providerUrl,'Requires provider url')

export const config = {
  chains: {
    [chainId]: {
      chainId,
      multicall2Address,
      optimisticOracleAddress,
      providerUrl,
    },
  },
};

const client = oracle.client.factory(config,()=>undefined)

function App() {
  return (
    <div className="App">
      <ConnectionProvider>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="request" element={<Request />} />
          </Route>
        </Routes>
      </ConnectionProvider>
    </div>
  );
}

export default App;
