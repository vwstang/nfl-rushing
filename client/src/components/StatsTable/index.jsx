import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import { ASCENDING, DESCENDING, NONE } from "../../constants";

const nextSortState = (currState) => {
  switch (currState) {
    case ASCENDING:
      return DESCENDING;
    case DESCENDING:
      return NONE;
    default:
      return ASCENDING;
  }
};

const StatsTable = (props) => {
  const [rushingStats, setRushingStats] = useState([]);
  const [loading, setLoading] = useState(true); // Initial page load
  const [processing, setProcessing] = useState(false); // Sort or filter processing
  const [downloading, setDownloading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [sorting, setSorting] = useState({ by: "", order: NONE });
  const [countPerPage, setCountPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [targetPage, setTargetPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const dlRef = useRef(null);

  const COL_ORDER = [
    { code: "Player", desc: "Player's name" },
    { code: "Team", desc: "Player's team abbreviation" },
    { code: "Pos", desc: "Player's position" },
    { code: "Att", desc: "Rushing attempts" },
    {
      code: "Yds",
      desc: "Total rushing yards",
      sortable: {
        setState: () =>
          setSorting({
            by: "Yds",
            order:
              sorting.by === "Yds" ? nextSortState(sorting.order) : ASCENDING
          })
      }
    },
    { code: "Att/G", desc: "Rushing attempts per game average" },
    { code: "Avg", desc: "Rushing average yards per attempt" },
    { code: "Yds/G", desc: "Rushing yards per game" },
    {
      code: "TD",
      desc: "Total rushing touchdowns",
      sortable: {
        setState: () =>
          setSorting({
            by: "TD",
            order:
              sorting.by === "TD" ? nextSortState(sorting.order) : ASCENDING
          })
      }
    },
    {
      code: "Lng",
      desc: "Longest rush -- a T represents a touchdown occurred",
      sortable: {
        setState: () =>
          setSorting({
            by: "Lng",
            order:
              sorting.by === "Lng" ? nextSortState(sorting.order) : ASCENDING
          })
      }
    },
    { code: "1st", desc: "Rushing first downs" },
    { code: "1st%", desc: "Rushing first down percentage" },
    { code: "20+", desc: "Rushing 20+ yards each" },
    { code: "40+", desc: "Rushing 40+ yards each" },
    { code: "FUM", desc: "Rushing fumbles" }
  ];

  const downloadData = async () => {
    setDownloading(true);
    const headers = {
      name: filterName,
      ...(sorting.order !== NONE && {
        [sorting.by.toLowerCase()]: sorting.order
      })
    };
    try {
      const response = await axios.get("/utilities/rushingstats/getcsv", {
        headers
      });
      const dataBlob = new Blob([response.data], {
        type: response.headers["Content-Type"]
      });
      dlRef.current.href = URL.createObjectURL(dataBlob);
      dlRef.current.download = "rushing.csv";
      dlRef.current.click();
      dlRef.current.href = "#";
      dlRef.current.download = null;
    } catch (error) {
      console.error(
        "An error occurred while attempting to download CSV. Please try again later."
      );
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  const getData = async () => {
    setProcessing(true);
    const headers = {
      name: filterName,
      ...(sorting.order !== NONE && {
        [sorting.by.toLowerCase()]: sorting.order
      }),
      countppg: countPerPage,
      page
    };
    try {
      const response = await axios.get("/utilities/rushingstats", {
        headers
      });
      setRushingStats(response.data.recordset);
      setPageCount(response.data.totalpages);
      setProcessing(false);
    } catch (error) {
      setErrMsg(
        "There was an error loading the rushing statistics. Please try again later."
      );
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    getData();
  }, [sorting, countPerPage, page]);

  useEffect(() => {
    if (page !== targetPage) {
      setTargetPage(page);
    }
  }, [page]);

  useEffect(() => {
    if (!loading && page > pageCount) {
      setPage(pageCount);
    }
  }, [pageCount]);

  if (loading) {
    return <div>Loading rushing statistics...</div>;
  } else if (errMsg) {
    return <div>{errMsg}</div>;
  } else {
    return (
      <>
        <div className="tableHeading">
          <div className="tablePaginator">
            <div>
              <label htmlFor="countPerPage">Records per page: </label>
              <select
                id="countPerPage"
                className="tableCPPG"
                value={countPerPage}
                onChange={(e) => setCountPerPage(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div>
              <button
                id="pageDecrementer"
                className="paginator__changer"
                type="button"
                onClick={() => setPage(Math.max(1, page - 1))}
              >
                &#9664;
              </button>
              <input
                id="pageIndicator"
                className="paginator__indicator"
                type="number"
                value={targetPage}
                onChange={(e) => setTargetPage(e.target.value)}
                onBlur={() => {
                  if (targetPage < 1) {
                    setPage(1);
                  } else if (targetPage > pageCount) {
                    setPage(pageCount);
                  } else if (targetPage !== page) {
                    setPage(targetPage);
                  }
                }}
              />
              <span>{` of ${pageCount} pages`}</span>
              <button
                id="pageIncrementer"
                className="paginator__changer"
                type="button"
                onClick={() => setPage(Math.min(pageCount, page + 1))}
              >
                &#9654;
              </button>
            </div>
          </div>
          <div className="tableActions">
            <form
              className="tableFilterForm"
              onSubmit={(e) => {
                e.preventDefault();
                getData();
              }}
            >
              <input
                className="tableFilterInput"
                type="text"
                placeholder="Filter by Player"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
              <button className="tableButton" type="submit">
                Filter
              </button>
            </form>
            <button
              className={`tableButton${downloading ? " downloading" : ""}`}
              type="button"
              onClick={downloadData}
              disabled={downloading}
            >
              {downloading ? "Downloading..." : "Export as CSV"}
            </button>
            <a style={{ display: "none " }} href="#" ref={dlRef}>
              Export as CSV
            </a>
          </div>
        </div>
        {rushingStats.length === 0 ? (
          <div>No statistics were found!</div>
        ) : (
          <>
            <div className={`rushStats${processing ? " loading" : ""}`}>
              {COL_ORDER.map((column, idx, arr) => {
                const rKey = `Header-${column.code}`;

                let classes = "rushStats__header";
                if (idx === 0) {
                  classes += " rushStats__header--name";
                } else if (idx === arr.length - 1) {
                  classes += " rushStats__header--last";
                }

                const headerProps = {
                  key: rKey,
                  code: column.code,
                  title: column.desc,
                  classes
                };

                if (column.sortable) {
                  headerProps.classes += " sortable";
                  headerProps.setSorting = column.sortable.setState;
                  if (sorting.by === column.code && sorting.order !== NONE) {
                    headerProps.classes += ` ${sorting.order.toLowerCase()}`;
                  }
                }
                return <TableHeader {...headerProps} />;
              })}
              {rushingStats.map((playerStat, idx) => {
                const rKey = `${playerStat.Player.replace(/\s/g, "")}-${idx}`;
                return (
                  <TableRow
                    key={rKey}
                    playerStat={playerStat}
                    colOrder={COL_ORDER}
                    altBG={idx % 2 === 1}
                  />
                );
              })}
            </div>
          </>
        )}
      </>
    );
  }
};

export default StatsTable;
