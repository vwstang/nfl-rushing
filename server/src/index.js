const express = require("express");
const api = require("./routes/api");

const server = express();

server.use("/api", api);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.info(`nfl-rushing api server started at http://localhost:${PORT}`)
);
