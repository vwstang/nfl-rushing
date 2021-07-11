import React, { useState, useEffect } from "react";
import axios from "axios";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";

// Following the order of the stats per the Challenge Background in the readme
const COL_ORDER = [
  { code: "Player", desc: "Player's name" },
  { code: "Team", desc: "Player's team abbreviation" },
  { code: "Pos", desc: "Player's position" },
  { code: "Att/G", desc: "Rushing attempts per game average" },
  { code: "Att", desc: "Rushing attempts" },
  { code: "Yds", desc: "Total rushing yards", sortable: true },
  { code: "Avg", desc: "Rushing average yards per attempt" },
  { code: "Yds/G", desc: "Rushing yards per game" },
  { code: "TD", desc: "Total rushing touchdowns", sortable: true },
  {
    code: "Lng",
    desc: "Longest rush -- a T represents a touchdown occurred",
    sortable: true
  },
  { code: "1st", desc: "Rushing first downs" },
  { code: "1st%", desc: "Rushing first down percentage" },
  { code: "20+", desc: "Rushing 20+ yards each" },
  { code: "40+", desc: "Rushing 40+ yards each" },
  { code: "FUM", desc: "Rushing fumbles" }
];

const runFilter = (e, setState) => {
  e.preventDefault();
  setState.setProcessing(true);
  const headers = { "r-filter-name": e.target.value };
  (async () => {
    const response = await axios.get("/utilities/rushingstats", { headers });
    setState.setRushingStats(response.data);
    setState.setProcessing(false);
  })();
};

const downloadCSV = () => {
  // TODO: This should take the current filter and sort states, query DB without pagination, and download as CSV
};

const StatsTable = (props) => {
  const [rushingStats, setRushingStats] = useState([]);
  const [loading, setLoading] = useState(true); // Initial page load
  const [processing, setProcessing] = useState(false); // Sort or filter processing
  const [errMsg, setErrMsg] = useState(null);
  const [filterName, setFilterName] = useState("");

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
  } else if (rushingStats.length === 0) {
    return <div>No statistics were found!</div>;
  } else {
    return (
      <>
        <div className="tableHeading">
          <h1 className="tableHeading--title">NFL Rushing Statistics</h1>
          <form
            className="tableFilterForm"
            onSubmit={(e) => runFilter(e, { setProcessing, setRushingStats })}
          >
            <input
              className="tableFilterInput"
              type="text"
              placeholder="Filter by Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </form>
          <button
            className="tableDownload"
            type="button"
            onClick={() => downloadCSV(rushingStats)}
          >
            Download CSV
          </button>
        </div>
        <div className={`rushStats${processing ? " loading" : ""}`}>
          <TableHeader colOrder={COL_ORDER} />
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
      </>
    );
  }
};

export default StatsTable;
