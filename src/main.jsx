/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./css/app.css"
import "./css/icons.css"
import "./css/style.css"
import "framework7/css/bundle";
import Framework7 from "framework7/lite-bundle";
import Framework7React from "framework7-react";

Framework7.use(Framework7React);
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
