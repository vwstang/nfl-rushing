const express = require("express");

const stats = express.Router();

stats.get("/rushing", async (req, res) => {
  const { getRushingStats } = require("../../../controllers/services");

  const resData = await getRushingStats();

  return res.send(resData.slice(0, 20));
});

module.exports = stats;
