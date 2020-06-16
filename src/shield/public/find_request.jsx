import * as C from "./const.js";
import * as React from "react";

export const FindRequest = ({ state, acceptRequest, navigateTo }) => {
  return (
    <div style={{ "font-size": "30px" }}>
      <div style={{ "background-color": "yellow" }}>
        <p>SHIELD HELPER: FIND REQUEST</p>
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
                  {request._1_.items.map((item) => (
                    <li>{String(item)}</li>
                  ))}
                </ul>
              </td>
              <td>{String(request._1_.note)}</td>
              <td>{String(request._1_.reward)} S</td>

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
