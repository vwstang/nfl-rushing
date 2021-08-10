import axios from "axios";
import React, { useState, useEffect } from "react";

const TeamApp = (props) => {
  const [loading, setLoading] = useState(true);
  const [teamStats, setTeamStats] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/utilities/getteamstats");
      setTeamStats(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {Object.entries(teamStats).map((stat) => {
        return (
          <div>
            <span>{stat[0]}</span>
            <span>{stat[1]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TeamApp;
