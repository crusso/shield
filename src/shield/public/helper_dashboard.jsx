console.log("Loading user dashboard");

import * as React from "react";

export const HelperDashboard = ({ setGlobalState, state }) => {
  return (
    <div style={{ "font-size": "30px" }}>
      <div style={{ "background-color": "yellow" }}>
        <p>SHIELD HELPER DASHBOARD</p>
      </div>
      <div
        style={{
          margin: "30px",
          display: "grid",
          "grid-template-columns": "200px auto",
        }}
      >
        <div>Name</div>
      </div>
      <div></div>
    </div>
  );
};
