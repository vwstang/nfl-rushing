import axios from "axios";

const express = require("express");

const apiUrl = process.env.API_URL || "http://localhost:8800";

const utilities = express.Router();

utilities.get("/rushingstats", async (req, res) => {
  try {
    const headers = {
      ...(req.headers.name && { "r-filter-name": req.headers.name }),
      ...(req.headers.sortby && { "r-sort-by": req.headers.sortby }),
      ...(req.headers.sortorder && { "r-sort-order": req.headers.sortorder }),
      ...(req.headers.page && { "r-page": req.headers.page }),
      ...(req.headers.countppg && { "r-page-count": req.headers.countppg })
    };
    const response = await axios.get(`${apiUrl}/api/stats/rushing`, {
      headers
    });
    return res.send(response.data);
  } catch (error) {
    console.error("[routes.utilities.get.rushingstats]", error);
    return res.sendStatus(500);
  }
});

utilities.get("/getteamstats", async (req, res) => {
  try {
    const response = await axios.get(`${apiUrl}/api/stats/team`);
    console.log(response.data);
    return res.send(response.data);
  } catch (error) {
    console.error("[routes.utilities.get.getteamstats]", error);
    return res.sendStatus(500);
  }
});

utilities.get("/rushingstats/getcsv", async (req, res) => {
  try {
    const headers = {
      ...(req.headers.name && { "r-filter-name": req.headers.name }),
      ...(req.headers.sortby && { "r-sort-by": req.headers.sortby }),
      ...(req.headers.sortorder && { "r-sort-order": req.headers.sortorder })
    };
    const response = await axios.get(`${apiUrl}/api/stats/rushing/csvdata`, {
      headers
    });
    return res.attachment("rushing.csv").send(response.data);
  } catch (error) {
    console.error("[routes.utilities.get.rushingstats.getcsv]", error);
    return res.sendStatus(500);
  }
});

export default utilities;
