import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { store } from "./redux/store/store.js";
import i18n from "./i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
       domain="idiomas-master.us.auth0.com"
       clientId="QKuJSniRtysK5OlPJy3muRNgxlcujinH"
       authorizationParams={{
         redirect_uri: window.location.origin
       }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);