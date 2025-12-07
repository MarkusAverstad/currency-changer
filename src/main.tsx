import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./Dashboard";
import { CurrenciesProvider } from "hooks";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrenciesProvider>
      <Dashboard />
    </CurrenciesProvider>
  </StrictMode>,
);
