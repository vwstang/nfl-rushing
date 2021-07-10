const express = require("express");

const stats = express.Router();

stats.get("/rushing", async (req, res) => {
  const { getRushingStats } = require("../../../controllers/services");

  const resData = await getRushingStats();

  return res.send(resData);
});

module.exports = stats;
