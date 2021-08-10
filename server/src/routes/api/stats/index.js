const express = require("express");
const {
  getRushingStats,
  getTeamRushingStats
} = require("../../../controllers/services");

const stats = express.Router();

stats.get("/rushing", async (req, res) => {
  const queryParams = {
    ...(req.headers["r-filter-name"] && {
      Player: { $regex: req.headers["r-filter-name"], $options: "i" }
    })
  };

  const sortParams =
    req.headers["r-sort-by"] && req.headers["r-sort-order"]
      ? { by: req.headers["r-sort-by"], order: req.headers["r-sort-order"] }
      : null;

  const page = req.headers["r-page"]
    ? parseInt(req.headers["r-page"], 10)
    : null;

  const cppg = req.headers["r-page-count"]
    ? parseInt(req.headers["r-page-count"], 10)
    : undefined; // To trigger default parameter in getRushingStats

  const resData = await getRushingStats(queryParams, sortParams, page, cppg);

  return res.send(resData);
});

stats.get("/team", async (req, res) => {
  const resData = await getTeamRushingStats();

  return res.send(resData);
});

stats.get("/rushing/csvdata", async (req, res) => {
  const queryParams = {
    ...(req.headers["r-filter-name"] && {
      Player: { $regex: req.headers["r-filter-name"], $options: "i" }
    })
  };

  const sortParams =
    req.headers["r-sort-by"] && req.headers["r-sort-order"]
      ? { by: req.headers["r-sort-by"], order: req.headers["r-sort-order"] }
      : null;

  const resData = await getRushingStats(queryParams, sortParams);

  const jsonArrayToCSV = require("../../../utils/jsonArrayToCSV");

  const csvData = jsonArrayToCSV(resData.recordset);

  return res.attachment("rushing.csv").send(csvData);
});

module.exports = stats;
