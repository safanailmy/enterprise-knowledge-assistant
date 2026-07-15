import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";

import "./index.css";

import AppRouter from "./router/AppRouter";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
   <SidebarProvider>

      <AuthProvider>

          <AppRouter/>

      </AuthProvider>

  </SidebarProvider>
  </React.StrictMode>
);