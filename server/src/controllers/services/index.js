const connect = require("../db");

/**
 *
 * @param {Object} qryParams
 * @param {string} qryParams.name - Player name to filter data by
 * @returns
 */
const getRushingStats = async (qryParams, srtParams) => {
  const rushCollection = (await connect("ts-nfl-rushing")).collection(
    "RushingStats"
  );

  let rushCursor = await rushCollection.find(qryParams, {
    projection: { _id: 0 }
  });

  rushCursor = await rushCursor.sort(srtParams);

  const rushData = rushCursor.toArray();

  return rushData;
};

module.exports = { getRushingStats };
