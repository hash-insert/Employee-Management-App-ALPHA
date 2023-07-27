import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProviderContext from "./context/AuthContext.jsx";
import SnackbarContextProvider from "./context/SnackbarContext.jsx";
import ReRender from "./context/ReRender.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReRender>
      <AuthProviderContext>
        <SnackbarContextProvider>
          <QueryClientProvider client={new QueryClient()}>
            <App />
          </QueryClientProvider>
        </SnackbarContextProvider>
      </AuthProviderContext>
    </ReRender>
  </React.StrictMode>
);
