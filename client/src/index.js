import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ArticlesContextProvider } from "./context/ArticlesContext";
import { AuthContextProvider } from "./context/AuthContext"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ArticlesContextProvider>
        <App />
      </ArticlesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
