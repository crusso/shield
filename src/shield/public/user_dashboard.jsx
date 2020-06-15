console.log("Loading user dashboard");

import * as React from "react";

export const UserDashboard = ({ setGlobalState, state, makeMap }) => {
  console.log("Rendering nearby helpers", state.nearbyHelpers.length);

  after_load(() => {
    makeMap(state.me.user[0].location);
  });

  console.log("leaflet", leaflet);
  return (
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
        <div>
          <div>Hello {state.me.user[0].name.first}.</div>
          <div>{state.nearbyHelpers.length===0?"We are looking for helpers near you.":`There are ${state.nearbyHelpers.length} helpers living near you.`}</div>
        </div>
        <div id="mapid" style={{ height: "180px" }}></div>
      </div>
      <div></div>
    </div>
  );
};

function after_load(delayed_action) {
  setTimeout(delayed_action, 200); // horrible hack
}
