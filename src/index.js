import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import FormLogin from "./components/formLogin";
import NavbarLogin from "./components/navbarLogin";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#243142",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <NavbarLogin />
      <FormLogin style={{ padding: "100px" }} />
    </ThemeProvider>
  </React.StrictMode>
);
