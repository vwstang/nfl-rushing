import React from "react";
import { hydrate } from "react-dom";
import TeamApp from "./App/TeamApp";
import "./styles/index.scss";

hydrate(<TeamApp />, document.getElementById("root"));
