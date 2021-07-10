import routes from "./routes";

const express = require("express");

const server = express();

server.use(express.static("public"));

server.use("/", routes);

const PORT = 3100;
server.listen(PORT, () =>
  console.info(`nfl-rushing client server started at http://localhost:${PORT}`)
);
