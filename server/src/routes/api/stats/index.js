const express = require("express");

const stats = express.Router();

stats.get("/rushing", async (req, res) => {
  const { getRushingStats } = require("../../../controllers/services");

  const queryParams = {
    ...(req.headers["r-filter-name"] && {
      Player: { $regex: req.headers["r-filter-name"], $options: "i" }
    })
  };

  const resData = await getRushingStats(queryParams);

  return res.send(resData);
});

module.exports = stats;
