import { Routes, Route } from "react-router-dom";
import Request from "./components/request";
import Layout from "./components/layout";
import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
import { ConnectionProvider } from "./context/ConnectionContext";
import { RequestClientProvider } from "./context/RequestClientContext";
function App() {
  return (
    <div className="App">
      <ConnectionProvider>
        <RequestClientProvider>
          <GlobalStyles />
          <Navbar />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="request" element={<Request />} />
            </Route>
          </Routes>
        </RequestClientProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
