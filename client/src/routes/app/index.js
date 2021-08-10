import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../../components/App";
import TeamApp from "../../components/App/TeamApp";
import pageCompiler, { scriptGenerator } from "../../utils/pageCompiler";

const express = require("express");

const app = express.Router();

app.get("/", async (req, res) => {
  const htmlFilePath = path.resolve(__dirname, "../../pages/rushing.html");

  const components = renderToString(<App />);
  const scripts = scriptGenerator("rushing");

  const html = await pageCompiler(htmlFilePath, components, scripts);

  res.send(html);
});

app.get("/team", async (req, res) => {
  const htmlFilePath = path.resolve(__dirname, "../../pages/rushing.html");

  const components = renderToString(<TeamApp />);
  const scripts = scriptGenerator("team");

  const html = await pageCompiler(htmlFilePath, components, scripts);

  res.send(html);
});

export default app;
