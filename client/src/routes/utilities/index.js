import axios from "axios";

const express = require("express");

const utilities = express.Router();

utilities.get("/rushingstats", async (req, res) => {
  try {
    const headers = {
      ...(req.headers.name && { "r-filter-name": req.headers.name }),
      ...(req.headers.yds && { "r-sort-yds": req.headers.yds }),
      ...(req.headers.lng && { "r-sort-lng": req.headers.lng }),
      ...(req.headers.td && { "r-sort-td": req.headers.td })
    };
    const response = await axios.get(
      "http://localhost:3000/api/stats/rushing",
      { headers }
    );
    return res.send(response.data);
  } catch (error) {
    console.error("[routes.utilities.get.rushingstats]", error);
    return res.sendStatus(500);
  }
});

export default utilities;
