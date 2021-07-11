import React from "react";
import { hydrate } from "react-dom";
import App from "./App";
import "./styles/index.scss";

hydrate(<App />, document.getElementById("root"));
