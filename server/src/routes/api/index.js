const express = require("express");
const stats = require("./stats");

const api = express.Router();

api.use("/stats", stats);

module.exports = api;
