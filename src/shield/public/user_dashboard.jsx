console.log("Loading user dashboard");

import * as React from "react";
import * as C from "./const.js";

export const UserDashboard = ({ navigateTo, state, makeMap, makeMarkers }) => {
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
        <span style={{ float: "right" }}>{state.balance} S</span>
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
              : `There are ${
                  (state.nearbyHelpers || []).length
                } helpers living near you.`}
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
        <table
          id="accepted-tasks"
          style={{
            margin: "30px",
          }}
        >
          <thead style={{ "font-weight": "bold" }}>
            <tr>
              <td>Type</td>
              <td>Location</td>
              <td>Items</td>
              <td>Notes</td>
              <td>Reward</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody
            style={{
              margin: "30px",
            }}
          >
            {state.requests.length ? (
              state.requests.map((request, index) => (
                <tr
                  style={{
                    backgroundColor: index % 2 === 0 ? "#EEEEEE" : "#EFEFEF",
                  }}
                >
                  <td>{String(Object.keys(["_1_", "info", "requestType"].reduce((n,i) => n&&n[i], request)||{})[0])}</td>
                  <td>
                    <button
                      onClick={() =>
                        makeMarkers([request._1_.info.requestLocation])
                      }
                    >
                      Show on map
                    </button>
                  </td>
                  <td>
                    <ul>
                        { request._1_.info.items.map(item => <li>{String(item)}</li>)}
                    </ul>
                  </td>
                  <td>{String(request._1_.info.note)}</td>
                  <td>{String(["_1_", "info", "reward"].reduce((n,i) => n&&n[i], request))} S</td>
                  <td>{String(Object.keys(request._1_.status)[0])} S</td>
                </tr>
              ))
            ) : (
              <tr colspan="10">You have no current requests</tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function after_load(delayed_action) {
  setTimeout(delayed_action, 200); // horrible hack
}
