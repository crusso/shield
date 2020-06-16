console.log("Loading user dashboard");

import * as React from "react";

function toyRequest() {
  return {
    requestType: [{ grocery: "yes!" }],
    requestLocation: { lat: 0, lng: 0 }, // TODO: Location other than user
    note: "Please choose green bananas",
    items: ["bananas", "latex gloves"],
    reward: 9,
  };
}

export const CreateRequest = ({ state, createRequest }) => {
  return (
    <div style={{ "font-size": "30px" }}>
      <div style={{ "background-color": "yellow" }}>
        <p>SHIELD USER: CREATE REQUEST</p>
      </div>
      <div
        style={{
          margin: "30px",
          display: "grid",
          "grid-template-columns": "200px auto",
        }}
      >
        <div>
          <button onClick={() => createRequest(toyRequest())}>Request!</button>
        </div>
      </div>
      <div>{state.errorMessage}</div>
    </div>
  );
};
