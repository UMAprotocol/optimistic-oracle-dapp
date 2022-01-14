import { ConnectionProvider } from "./context/ConnectionContext";
import { RequestClientProvider } from "./context/RequestClientContext";
import Router from "./Router";
function App() {
  return (
    <div className="App">
      <ConnectionProvider>
        <RequestClientProvider>
          <Router />
        </RequestClientProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
