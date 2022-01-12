import { Routes, Route } from "react-router-dom";
import Request from "./components/request";
import Layout from "./components/layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="request" element={<Request />} />
      </Route>
    </Routes>
  );
};

export default Router;
