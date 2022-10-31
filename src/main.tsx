import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CookiesProvider } from "react-cookie";
import App from "./pages/App";
import "./index.css";
import Page404 from "./pages/Page404";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CookiesProvider>
        <BrowserRouter>
          <link
            href="https://pvinis.github.io/iosevka-webfont/3.4.1/iosevka.css"
            rel="stylesheet"
          />
          <Routes>
            <Route index element={<App />} />
            <Route path={"*"} element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </ApolloProvider>
  </React.StrictMode>
);
