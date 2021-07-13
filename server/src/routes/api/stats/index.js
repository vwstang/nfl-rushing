const express = require("express");
const { ASCENDING, DESCENDING } = require("../../../constants");
const { jsonArrayToCSV } = require("../../../utils");

const MONGO_SORT = {
  [ASCENDING]: 1,
  [DESCENDING]: -1
};

const stats = express.Router();

stats.get("/rushing", async (req, res) => {
  const { getRushingStats } = require("../../../controllers/services");

  const queryParams = {
    ...(req.headers["r-filter-name"] && {
      Player: { $regex: req.headers["r-filter-name"], $options: "i" }
    })
  };

  const sortParams = {
    ...(req.headers["r-sort-yds"] && {
      Yds: MONGO_SORT[req.headers["r-sort-yds"]]
    }),
    ...(req.headers["r-sort-lng"] && {
      Lng: MONGO_SORT[req.headers["r-sort-lng"]]
    }),
    ...(req.headers["r-sort-td"] && {
      TD: MONGO_SORT[req.headers["r-sort-td"]]
    })
  };

  const page = req.headers["r-page"]
    ? parseInt(req.headers["r-page"], 10)
    : null;

  const cppg = req.headers["r-page-count"]
    ? parseInt(req.headers["r-page-count"], 10)
    : undefined;

  const resData = await getRushingStats(queryParams, sortParams, page, cppg);

  return res.send(resData);
});

stats.get("/rushing/csvdata", async (req, res) => {
  const { getRushingStats } = require("../../../controllers/services");

  const queryParams = {
    ...(req.headers["r-filter-name"] && {
      Player: { $regex: req.headers["r-filter-name"], $options: "i" }
    })
  };

  const sortParams = {
    ...(req.headers["r-sort-yds"] && {
      Yds: MONGO_SORT[req.headers["r-sort-yds"]]
    }),
    ...(req.headers["r-sort-lng"] && {
      Lng: MONGO_SORT[req.headers["r-sort-lng"]]
    }),
    ...(req.headers["r-sort-td"] && {
      TD: MONGO_SORT[req.headers["r-sort-td"]]
    })
  };

  const resData = await getRushingStats(queryParams, sortParams);

  const csvData = jsonArrayToCSV(resData.recordset);

  return res.attachment("rushing.csv").send(csvData);
});

module.exports = stats;
