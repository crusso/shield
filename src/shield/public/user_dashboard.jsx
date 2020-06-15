import * as React from "react";

export const UserDashboard = ({ setGlobalState, state }) => (
  <div style={{ "font-size": "30px" }}>
    <div style={{ "background-color": "yellow" }}>
      <p>SHIELD USER DASHBOARD</p>
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
