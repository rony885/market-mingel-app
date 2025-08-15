import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApiContext } from "./context/ApiContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiContext>
      <App />
    </ApiContext>
  </React.StrictMode>
);

reportWebVitals();
