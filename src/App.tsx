import { Routes, Route } from "react-router-dom";
import Request from "./components/request";
import Layout from "./components/layout";
import GlobalStyles from "./components/global-styles";
import Navbar from "./components/navbar";
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="request" element={<Request />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
