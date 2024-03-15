import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CustomersContextProvider } from "./context/CustomerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CustomersContextProvider>
      <App />
    </CustomersContextProvider>
  </React.StrictMode>
);
