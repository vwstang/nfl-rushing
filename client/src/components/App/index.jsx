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
        <div className="rushHeader__wrapper">
          <div className="rushHeader__Logo">
            the<span className="rushHeader__Logo--R">R</span>ush
          </div>
        </div>
      </header>
      <main className="rushMain">
        <h1 className="title">NFL Rushing Statistics</h1>
        <StatsTable />
      </main>
      <footer className="rushFooter">
        <span className="challenger">Challenge by Vincent Tang</span>
      </footer>
    </>
  );
};

export default App;
