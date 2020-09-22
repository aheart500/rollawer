import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./ApolloClient";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  ThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";
import theme from "./theme";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StylesProvider jss={jss}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </StylesProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
