import React, { useState, useEffect } from "react";
import StatsTable from "../StatsTable";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <></>
  ) : (
    <>
      <header className="rushHeader">
        <div className="rushLogo">
          the<span className="rushLogo--R">R</span>ush
        </div>
      </header>
      <main className="rushMain">
        <StatsTable />
      </main>
    </>
  );
};

export default App;
