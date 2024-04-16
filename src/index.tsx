import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "react-auth-kit";

import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  LightTheme,
  BaseProvider,
  styled,
  DarkTheme,
  createDarkTheme,
} from "baseui";

const engine = new Styletron();


const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider
        theme={DarkTheme}
      >
        <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >

            <BrowserRouter>
              <App />
            </BrowserRouter>

        </AuthProvider>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);

