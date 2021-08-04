/**
 * @typedef {Object} paginatorResult
 * @property {Array} recordsetpage - current page of the record
 * @property {nuberm} totalpages - total number of pages after pagination
 */
/**
 * Returns a subset of an array given a target page and number of records per page
 * @param {Array} recordset - array to retrieve a page of
 * @param {number} targetpage - target page to retrieve
 * @param {number} countperpage - number of records per page
 * @returns {paginatorResult} target subset of array
 */
const paginator = (recordset, targetpage, countperpage) => {
  if (targetpage < 1) {
    throw new RangeError(
      `[utils.paginator] Invalid targetpage: '${targetpage}'`
    );
  }
  const startIndex = (targetpage - 1) * countperpage;
  const endIndex = (targetpage - 1) * countperpage + countperpage;
  return {
    recordsetpage: recordset.slice(startIndex, endIndex),
    totalpages: Math.ceil(recordset.length / countperpage) || 0
  };
};

module.exports = paginator;
