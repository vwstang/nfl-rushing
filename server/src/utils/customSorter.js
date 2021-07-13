const { DESCENDING } = require("../constants");

/**
 * Sort the rushing statistics by total rushing yards ('Yds'). Custom sort required due to Yds column containing mixed data types
 * @param {Array} recordset - Array representing the set of records to sort
 * @param {'ASCENDING'|'DESCENDING'} sortorder - Order to sort by
 * @returns {Array} the sorted recordset
 */
const sortYds = (recordset, sortorder) => {
  return recordset.sort((a, b) => {
    let testA = a.Yds;
    let testB = b.Yds;
    if (typeof testA === "string") {
      testA = parseInt(testA.replace(/,/g, ""), 10);
    }
    if (typeof testB === "string") {
      testB = parseInt(testB.replace(/,/g, ""), 10);
    }
    let test = testA - testB;
    return sortorder === DESCENDING ? test * -1 : test;
  });
};

/**
 * Sort the rushing statistics by longest rush ('Lng'). Custom sort required due to Lng column containing mixed data types and a touchdown marker that is irrelevant to the sort
 * @param {Array} recordset - Array representing the set of records to sort
 * @param {'ASCENDING'|'DESCENDING'} sortorder - Order to sort by
 * @returns {Array} the sorted recordset
 */
const sortLng = (recordset, sortorder) => {
  return recordset.sort((a, b) => {
    let testA = a.Lng;
    let testB = b.Lng;
    if (typeof testA === "string") {
      testA = parseInt(testA.replace(/T/g, ""), 10);
    }
    if (typeof testB === "string") {
      testB = parseInt(testB.replace(/T/g, ""), 10);
    }
    let test = testA - testB;
    return sortorder === DESCENDING ? test * -1 : test;
  });
};

module.exports = { sortYds, sortLng };
