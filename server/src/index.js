const express = require("express");
const api = require("./routes/api");

const server = express();

server.use("/api", api);

const PORT = 3000;
server.listen(PORT, () =>
  console.info(`nfl-rushing server started at http://localhost:${PORT}`)
);
