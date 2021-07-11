const connect = require("../db");

/**
 *
 * @param {Object} qryParams
 * @param {string} qryParams.name - Player name to filter data by
 * @returns
 */
const getRushingStats = async (qryParams) => {
  const rushCollection = (await connect("ts-nfl-rushing")).collection(
    "RushingStats"
  );

  const rushData = await rushCollection
    .find(qryParams, { projection: { _id: 0 } })
    .toArray();

  return rushData;
};

module.exports = { getRushingStats };
