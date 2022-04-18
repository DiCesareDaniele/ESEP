import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import FormLogin from "./components/formLogin";
import NavbarLogin from "./components/navbarLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavbarLogin />
    <FormLogin style={{ padding: "60px" }} />
  </React.StrictMode>
);
