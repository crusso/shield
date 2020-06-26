import * as C from "./const.js";
import * as React from "react";

export const FindRequest = ({
  state,
  makeMap,
  makeMarkers,
  acceptRequest,
  navigateTo,
}) => {
  after_load(() => {
    makeMap(
      state.me.helper[0].location,
      state.nearbyHelpers &&
        state.nearbyHelpers.map((helper) => helper._1_.location)
    );
  });
  return (
    <div style={{ "font-size": "30px" }} class="helper">
      <div class="title">
        <span>SHIELD HELPER: FIND REQUEST</span>
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
        id="open-tasks"
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
            <td>Challenge</td>
          </tr>
        </thead>
        <tbody
          style={{
            margin: "30px",
          }}
        >
          {state.open_requests.map((request, index) => (
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
                  {request._1_.items.map((item) => (
                    <li>{String(item)}</li>
                  ))}
                </ul>
              </td>
              <td>{String(request._1_.note)}</td>
              <td>
                {" "}
                <span class="credit">{String(request._1_.reward)}</span>
              </td>

              <td>
                <button onClick={() => acceptRequest(request._0_)}>
                  Accept!
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigateTo(C.HELPER_DASHBOARD)}>BACK</button>
      <div>{state.errorMessage}</div>
    </div>
  );
};

function after_load(delayed_action) {
  setTimeout(delayed_action, 200); // horrible hack
}
