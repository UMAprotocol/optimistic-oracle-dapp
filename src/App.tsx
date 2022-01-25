import { OracleClientProvider } from "./context/OracleClientContext";
import Router from "./Router";
function App() {
  return (
    <div className="App">
      <OracleClientProvider>
        <Router />
      </OracleClientProvider>
    </div>
  );
}

export default App;
