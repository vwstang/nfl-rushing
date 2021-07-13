const connect = require("../db");

/**
 *
 * @typedef {Object} rushingStatistics
 * @property {*}
 * @returns
 */
/**
 *
 * @typedef {Object} rushingStatsData
 * @property {rushingStatistics[]} recordset - array of player rushing statistics
 * @property {number} [totalpages] - calculated number of pages of recordset if page and cppg provided
 */

/**
 *
 * @param {Object} qryParams
 * @param {string} qryParams.name - player name to filter data by
 * @param {Object} srtParams
 * @param {number} [page] - page number of data to return
 * @param {number} [cppg] - number of records to return per page (default: 20)
 * @returns {rushingStatsData} array of player rushing statistics
 */
const getRushingStats = async (qryParams, srtParams, page, cppg = 20) => {
  const rushCollection = (await connect("ts-nfl-rushing")).collection(
    "RushingStats"
  );

  let rushCursor = await rushCollection.find(qryParams, {
    projection: { _id: 0 }
  });

  if (srtParams) {
    rushCursor = await rushCursor.sort(srtParams);
  }

  if (page) {
    rushCursor = await rushCursor.skip((page - 1) * cppg).limit(cppg);
    const hitCount = await rushCursor.count(false);
    return {
      recordset: await rushCursor.toArray(),
      totalpages: Math.ceil(hitCount / cppg)
    };
  } else {
    return {
      recordset: await rushCursor.toArray()
    };
  }
};

module.exports = { getRushingStats };
