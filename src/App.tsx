import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
import { ConnectionProvider } from "./context/ConnectionContext";
import { RequestClientProvider } from "./context/RequestClientContext";
import Router from "./Router";
function App() {
  return (
    <div className="App">
      <ConnectionProvider>
        <RequestClientProvider>
          <GlobalStyles />
          <Navbar />
          <Router />
        </RequestClientProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
