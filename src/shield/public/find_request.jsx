console.log("Loading user dashboard");

import * as React from "react";

export const FindRequest = ({ state }) => {
  return (
    <div style={{ "font-size": "30px" }}>
      <div style={{ "background-color": "yellow" }}>
        <p>SHIELD HELPER: FIND REQUEST</p>
      </div>
      <div
        id="open-tasks"
        style={{
          margin: "30px",
          display: "grid",
          "grid-template-columns": "auto",
        }}
      >
        {state.open_requests.length ? (
          state.open_requests.map((request) => {
            return <div>{JSON.stringify(request)}</div>;
          })
        ) : (
          <div>No known help needed in your area.  Relax. :-)</div>
        )}
      </div>
      <div>{state.errorMessage}</div>
    </div>
  );
};
