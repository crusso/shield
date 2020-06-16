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
    <div style={{ "font-size": "30px" }}>
      <div style={{ "background-color": "yellow" }}>
        <span>SHIELD HELPER DASHBOARD</span>
        <span style={{ float: "right" }}>{state.balance} S</span>
      </div>

      <div
        id="map-bar"
        style={{
          margin: "30px",
          display: "grid",
          "grid-template-columns": "200px auto",
        }}
      >
        <div>
          <div>Hello {state.me.helper[0].name.first}.</div>
          <div>Thank you for helping</div>
        </div>
        <div id="mapid" style={{ height: "180px" }}></div>
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
                  backgroundColor: index % 2 === 0 ? "#EEEEEE" : "#EFEFEF",
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
                <td>{String(request._1_.reward)} S</td>
              </tr>
            ))
          ) : (
            <tr colspan="10">You have accepted no requests</tr>
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
