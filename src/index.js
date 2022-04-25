import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";

import FormLogin from "./components/formLogin";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Faq from "./components/faq";
import Sites from "./components/sites";
import PageNotFound from "./components/pageNotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: "#243142",
    },
    secondary: {
      main: "#202938",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar
                items={[
                  { text: "ABOUT US", img: "/img/about.png", url: "/about" },
                  { text: "FAQ", img: "/img/faq.png", url: "/faq" },
                  { text: "LOGIN", img: "img/login.png", url: "/login" },
                ]}
              />
              <Home style={{ padding: "100px" }} />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar
                items={[
                  { text: "FAQ", img: "/img/faq.png", url: "/faq" },
                  { text: "LOGIN", img: "img/login.png", url: "/login" },
                ]}
              />
              <About style={{ padding: "100px" }} />
            </>
          }
        />
        <Route
          path="/faq"
          element={
            <>
              <Navbar
                items={[
                  { text: "ABOUT US", img: "/img/about.png", url: "/about" },
                  { text: "LOGIN", img: "img/login.png", url: "/login" },
                ]}
              />
              <Faq style={{ padding: "100px" }} />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar
                items={[
                  { text: "ABOUT US", img: "/img/about.png", url: "/about" },
                  { text: "FAQ", img: "/img/faq.png", url: "/faq" },
                ]}
              />
              <FormLogin style={{ padding: "100px" }} />
            </>
          }
        />
        <Route
          path="/sites"
          element={
            <>
              <Navbar items={[]} />
              <Sites style={{ padding: "100px" }} />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <PageNotFound style={{ padding: "100px" }} />
            </>
          }
        />
      </Routes>
    </ThemeProvider>
  </Router>
);
