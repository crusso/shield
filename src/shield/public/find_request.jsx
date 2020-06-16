console.log("Loading user dashboard");

import * as React from "react";

export const FindRequest = ({ state }) => {
  return (
    <div style={{ "font-size": "30px" }}>
      <div style={{ "background-color": "yellow" }}>
        <p>SHIELD HELPER: FIND REQUEST</p>
      </div>
      <table
        id="open-tasks"
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
            </tr>
          ))}
        </tbody>
      </table>
      <div>{state.errorMessage}</div>
    </div>
  );
};
