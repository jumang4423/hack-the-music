import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CookiesProvider } from "react-cookie";
import App from "./pages/App";
import "./index.css";
import Page404 from "./pages/Page404";
import { createTheme } from "@mui/material/styles";
import { lightGreen, yellow } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import { RecoilRoot, useRecoilState } from "recoil";

const localURL = "http://localhost:4000/graphql";
const prodURL = "https://htm-backend.onrender.com/graphql";

const client = new ApolloClient({
  uri: process.env.NODE_ENV === "development" ? localURL : prodURL,
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[500],
    },
    secondary: {
      main: yellow[500],
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ApolloProvider client={client}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </CookiesProvider>
      </ApolloProvider>
    </RecoilRoot>
  </React.StrictMode>
);
