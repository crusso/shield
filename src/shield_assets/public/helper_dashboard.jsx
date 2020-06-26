import * as C from "./const.js";
import * as React from "react";

export const HelperDashboard = ({
  makeMap,
  makeMarkers,
  navigateTo,
  state,
}) => {
  // Show a map with the helper's position
  after_load(() => {
    makeMap(state.me.helper[0].location, [state.me.helper[0].location]);
  });

  return (
    <div style={{ "font-size": "30px" }} class="helper">
      <div class="title">
        <span>SHIELD HELPER DASHBOARD</span>
        <span style={{ float: "right" }} class="credit">
          {state.balance}
        </span>
      </div>

      <div
        id="map-bar"
        style={{
          margin: "30px",
          display: "grid",
          gridTemplateColumns: "200px auto",
          gridColumnGap: "30px",
        }}
      >
        <div>
          <div>Hello {state.me.helper[0].name.first}.</div>
          <div style={{ fontSize: "smaller" }}>Thank you for helping</div>
        </div>
        <div
          id="mapid"
          style={{ height: "180px", width: "100%", backgroundColor: "#AAA" }}
        ></div>
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
                <td>{String(Object.keys(request._1_.requestType)[0])}</td>
                <td>
                  <button
                    onClick={() => makeMarkers([request._1_.requestLocation])}
                  >
                    Show on map
                  </button>
                </td>
                <td>
                  <ul>
                    {(request._1_.items || []).map((item) => (
                      <li>{String(item)}</li>
                    ))}
                  </ul>
                </td>
                <td>{String(request._1_.note)}</td>
                <td>
                  <span class="credit">{String(request._1_.reward)}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colspan="10">You have accepted no requests</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => navigateTo(C.FIND_REQUEST)}>Find requests</button>
    </div>
  );
};

function after_load(delayed_action) {
  setTimeout(delayed_action, 200); // horrible hack
}
