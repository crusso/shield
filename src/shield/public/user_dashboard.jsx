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
      <input
        id="name"
        value={state.requesterDetails.name}
        onChange={(ev) => (state.requesterDetails.name = ev.target.value)}
      ></input>
    </div>
    <div>
      <button
        onClick={() => setGlobalState({ ...state, view: "UserDashboard" })}
      >
        Get Greeting!
      </button>
    </div>
  </div>
);
