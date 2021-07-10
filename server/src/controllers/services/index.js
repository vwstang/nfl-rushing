const connect = require("../db");

const getRushingStats = async () => {
  const rushCollection = (await connect("ts-nfl-rushing")).collection(
    "RushingStats"
  );

  const rushData = await rushCollection
    .find({}, { projection: { _id: 0 } })
    .toArray();

  return rushData;
};

module.exports = { getRushingStats };
