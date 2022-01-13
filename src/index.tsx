import React from "react";
import assert from "assert";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// Make sure environment variables are defined.
const ethProvider = process.env.REACT_APP_PROVIDER_URL_1;
const onboardKey = process.env.REACT_APP_ONBOARD_API_KEY;
const polygonProvider = process.env.REACT_APP_PROVIDER_URL_137;

assert(ethProvider, "Requires REACT_APP_PROVIDER_URL_1");
assert(polygonProvider, "Requires REACT_APP_PROVIDER_URL_137");
assert(onboardKey, "Requires REACT_APP_ONBOARD_API_KEY");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
