console.log("Loading user dashboard");

import * as React from "react";
import * as C from "./const.js";

export const UserDashboard = ({ navigateTo, state, makeMap }) => {
  console.log("Rendering nearby helpers", state.nearbyHelpers);

  after_load(() => {
    makeMap(
      state.me.user[0].location,
      state.nearbyHelpers &&
        state.nearbyHelpers.map((helper) => helper._1_.location)
    );
  });

  return (
    <div style={{ "font-size": "30px" }}>
      <div style={{ "background-color": "yellow" }}>
        <span>SHIELD USER DASHBOARD</span>
        <span style={{float: "right"}}>{state.balance} S</span>
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
          <div>
            {(state.nearbyHelpers || []).length === 0
              ? "We are looking for helpers near you."
              : `There are ${state.nearbyHelpers.length} helpers living near you.`}
          </div>
        </div>
        <div id="mapid" style={{ height: "180px" }}></div>
      </div>
      <div>
        <div></div>
        <div>
          <button onClick={() => navigateTo(C.CREATE_REQUEST)}>
            New Request!
          </button>
        </div>
        {state.requests.length ? (
          state.requests.map((request) => {
            return <div>{JSON.stringify(request)}</div>;
          })
        ) : (
          <div>You have no current requests</div>
        )}
      </div>
    </div>
  );
};

function after_load(delayed_action) {
  setTimeout(delayed_action, 200); // horrible hack
}
