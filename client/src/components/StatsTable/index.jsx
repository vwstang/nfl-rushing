import React, { useState, useEffect } from "react";
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

const downloadCSV = () => {
  // TODO: This should take the current filter and sort states, query DB without pagination, and download as CSV
};

const renderHeaderCol = (column, idx, arr) => {
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
    classes
  };

  if (column.sortable) {
    headerProps.classes += " sortable";
    headerProps.sorting = column.sortable.state;
    headerProps.setSorting = column.sortable.setState;
    if (column.sortable.state !== NONE) {
      headerProps.classes += ` ${column.sortable.state.toLowerCase()}`;
    }
  }

  return <TableHeader {...headerProps} />;
};

const StatsTable = (props) => {
  const [rushingStats, setRushingStats] = useState([]);
  const [loading, setLoading] = useState(true); // Initial page load
  const [processing, setProcessing] = useState(false); // Sort or filter processing
  const [errMsg, setErrMsg] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [sortYds, setSortYds] = useState(NONE);
  const [sortLng, setSortLng] = useState(NONE);
  const [sortTD, setSortTD] = useState(NONE);

  // Following the order of the stats per the Challenge Background in the readme
  const COL_ORDER = [
    { code: "Player", desc: "Player's name" },
    { code: "Team", desc: "Player's team abbreviation" },
    { code: "Pos", desc: "Player's position" },
    { code: "Att/G", desc: "Rushing attempts per game average" },
    { code: "Att", desc: "Rushing attempts" },
    {
      code: "Yds",
      desc: "Total rushing yards",
      sortable: {
        state: sortYds,
        setState: () => setSortYds(nextSortState(sortYds))
      }
    },
    { code: "Avg", desc: "Rushing average yards per attempt" },
    { code: "Yds/G", desc: "Rushing yards per game" },
    {
      code: "TD",
      desc: "Total rushing touchdowns",
      sortable: {
        state: sortTD,
        setState: () => setSortTD(nextSortState(sortTD))
      }
    },
    {
      code: "Lng",
      desc: "Longest rush -- a T represents a touchdown occurred",
      sortable: {
        state: sortLng,
        setState: () => setSortLng(nextSortState(sortLng))
      }
    },
    { code: "1st", desc: "Rushing first downs" },
    { code: "1st%", desc: "Rushing first down percentage" },
    { code: "20+", desc: "Rushing 20+ yards each" },
    { code: "40+", desc: "Rushing 40+ yards each" },
    { code: "FUM", desc: "Rushing fumbles" }
  ];

  const runFilter = (e) => {
    e.preventDefault();
    setProcessing(true);
    const headers = {
      name: filterName
    };
    (async () => {
      const response = await axios.get("/utilities/rushingstats", { headers });
      setRushingStats(response.data);
      setProcessing(false);
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/utilities/rushingstats");
        setRushingStats(response.data);
      } catch (error) {
        setErrMsg(
          "There was an error loading the rushing statistics. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading rushing statistics...</div>;
  } else if (errMsg) {
    return <div>{errMsg}</div>;
  } else {
    return (
      <>
        <div className="tableHeading">
          <h1 className="tableHeading--title">NFL Rushing Statistics</h1>
          <form className="tableFilterForm" onSubmit={runFilter}>
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
            className="tableButton"
            type="button"
            onClick={() => downloadCSV(rushingStats)}
          >
            Download CSV
          </button>
        </div>
        {rushingStats.length === 0 ? (
          <div>No statistics were found!</div>
        ) : (
          <div className={`rushStats${processing ? " loading" : ""}`}>
            {COL_ORDER.map(renderHeaderCol)}
            {rushingStats.map((playerStat, idx) => {
              const rKey = `${playerStat.Player.replace(/\s/g, "")}-${
                playerStat.Team
              }`;
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
        )}
      </>
    );
  }
};

export default StatsTable;
