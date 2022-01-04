import React from "react";
import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import Request from "./components/request";
import Layout from "./components/layout";

function App() {
  const location = useLocation();
  console.log("location", location);
  const [searchParams] = useSearchParams();
  console.log(
    "SP",
    searchParams,
    searchParams.forEach((el) => console.log("el", el))
  );
  return (
    <div className="App">
      <h2>OO App</h2>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="request" element={<Request />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
