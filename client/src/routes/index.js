import app from "./app";
import utilities from "./utilities";

const express = require("express");

const routes = express.Router();

routes.use("/", app);
routes.use("/utilities", utilities);

export default routes;
