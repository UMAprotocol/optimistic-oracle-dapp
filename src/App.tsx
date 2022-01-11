import assert from "assert";
import { Routes, Route } from "react-router-dom";
import Request from "./components/request";
import Layout from "./components/layout";
import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
import { ConnectionProvider } from "./context/ConnectionContext";

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
