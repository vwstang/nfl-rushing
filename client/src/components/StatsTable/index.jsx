import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "./components/TableRow";

const StatsTable = (props) => {
  const [rushingStats, setRushingStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

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
      <div>
        {rushingStats.slice(0, 5).map((playerStat) => {
          return (
            <TableRow
              key={`${playerStat.Team}-${playerStat.Player.replace(/\s/g, "")}`}
              playerStat={playerStat}
            />
          );
        })}
      </div>
    );
  }
};

export default StatsTable;
