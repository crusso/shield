import * as React from "react";
import * as C from "./const.js";

export const UserDashboard = ({
  navigateTo,
  state,
  makeMap,
  makeMarkers,
  confirmRequest,
}) => {
  after_load(() => {
    makeMap(
      state.me.user[0].location,
      state.nearbyHelpers &&
        state.nearbyHelpers.map((helper) => helper._1_.location)
    );
  });

  return (
    <div style={{ "font-size": "30px" }} class="user">
      <div class="title">
        <span>SHIELD USER DASHBOARD</span>
        <span style={{ float: "right" }} class="credit">
          {state.balance}
        </span>
      </div>
      <div
        style={{
          margin: "30px",
          display: "grid",
          gridTemplateColumns: "200px auto",
          gridColumnGap: "30px",
        }}
      >
        <div>
          <div>Hello {state.me.user[0].name.first}.</div>
          <div style={{ fontSize: "smaller" }}>
            {(state.nearbyHelpers || []).length === 0
              ? "We are looking for helpers near you."
              : `There are ${
                  (state.nearbyHelpers || []).length
                } helpers living near you.`}
          </div>
        </div>
        <div
          id="mapid"
          style={{ height: "180px", width: "100%", backgroundColor: "#AAA" }}
        ></div>
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
            width: "100%",
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
                    backgroundColor:
                      index % 2 === 0
                        ? "var(--background-color)"
                        : "var(--darker-background-color)",
                  }}
                >
                  <td>
                    {String(
                      Object.keys(
                        ["_1_", "info", "requestType"].reduce(
                          (n, i) => n && n[i],
                          request
                        ) || {}
                      )[0]
                    )}
                  </td>
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
                      {request._1_.info.items.map((item) => (
                        <li>{String(item)}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{String(request._1_.info.note)}</td>
                  <td>
                    <span class="credit">
                      {String(request._1_.info.reward)}
                    </span>
                  </td>
                  <td>
                    {String(Object.keys(request._1_.status)[0]) ===
                    "accepted" ? (
                      <button onClick={() => confirmRequest(request._0_)}>
                        Confirm completion
                      </button>
                    ) : (
                      String(Object.keys(request._1_.status)[0])
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colspan="10">You have no current requests</td>
              </tr>
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
