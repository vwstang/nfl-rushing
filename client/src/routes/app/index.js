import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import StatsTable from "../../components/StatsTable";
import pageCompiler, { scriptGenerator } from "../../utils/pageCompiler";

const express = require("express");

const app = express.Router();

app.get("/", async (req, res) => {
  const htmlFilePath = path.resolve(__dirname, "../../pages/rushing.hbs");

  const components = renderToString(<StatsTable />);
  const scripts = scriptGenerator("rushing");

  res.send("<div>Hello NFL fans</div>");
});

export default app;
