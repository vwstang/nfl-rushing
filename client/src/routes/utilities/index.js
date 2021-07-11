import axios from "axios";

const express = require("express");

const utilities = express.Router();

utilities.get("/rushingstats", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/api/stats/rushing");
    return res.send(response.data.slice(0, 50));
  } catch (error) {
    console.error("[routes.utilities.get.rushingstats]", error);
    return res.sendStatus(500);
  }
});

export default utilities;
