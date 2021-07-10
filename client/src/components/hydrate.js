import React from "react";
import { hydrate } from "react-dom";
import StatsTable from "./StatsTable";

hydrate(<StatsTable />, document.getElementById("root"));
