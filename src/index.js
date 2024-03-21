import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";
import { StaffContextProvider } from "./context/StaffContext";
import { ManagerContextProvider } from "./context/ManagerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ManagerContextProvider>
      <StaffContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </AuthContextProvider>
      </StaffContextProvider>
    </ManagerContextProvider>
  </React.StrictMode>
);
