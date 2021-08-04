const connect = require("../db");
const { DESCENDING } = require("../../constants");

// TD column appears to only contain numbers, whereas these two contain mixed types (string and numbers)
const CUST_SORT_REQD = {
  Yds: require("../../utils/customSorter").sortYds,
  Lng: require("../../utils/customSorter").sortLng
};

/**
 *
 * @typedef {Object} rushingStatistics
 * @property {string} Player
 * @property {string} Team
 * @property {string} Pos
 * @property {number} Att
 * @property {number|string} Yds
 * @property {number} `Att/G`
 * @property {number} Avg
 * @property {number} `Yds/G`
 * @property {number} TD
 * @property {number|string} Lng
 * @property {number} `1st`
 * @property {number} `1st%`
 * @property {number} `20+`
 * @property {number} `40+`
 * @property {number} FUM
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
 * @param {string} [qryParams.name] - player name to filter data by
 * @param {Object} [srtParams]
 * @param {string} srtParams.by - column to sort by
 * @param {'ASCENDING'|'DESCENDING'} srtParams.order - sort order
 * @param {number} [page] - page number of data to return
 * @param {number} [cppg] - number of records to return per page (default: 20)
 * @returns {rushingStatsData} array of player rushing statistics
 */
const getRushingStats = async (qryParams, srtParams, page, cppg = 20) => {
  const rushCollection = (await connect("ts-nfl-rushing")).collection(
    "RushingStats"
  );

  const rushCursor = await rushCollection.find(qryParams, {
    projection: { _id: 0 }
  });

  let rushArr;

  if (!srtParams) {
    rushArr = await rushCursor.toArray();
  } else if (CUST_SORT_REQD[srtParams.by]) {
    rushArr = await rushCursor.toArray();
    rushArr = CUST_SORT_REQD[srtParams.by](rushArr, srtParams.order);
  } else if (srtParams) {
    const mongoSortParams = {
      [srtParams.by]: srtParams.order === DESCENDING ? -1 : 1
    };
    rushArr = await rushCursor.sort(mongoSortParams).toArray();
  }

  if (page) {
    const paginator = require("../../utils/paginator");
    const result = paginator(rushArr, page, cppg);
    return { recordset: result.recordsetpage, totalpages: result.totalpages };
  } else if (page === 0 && rushArr.length === 0) {
    return { recordset: rushArr, totalpages: 0 };
  } else {
    return { recordset: rushArr };
  }
};

module.exports = { getRushingStats };
