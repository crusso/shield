console.log("Loading user dashboard");

import * as React from "react";
import { toyRequest } from "./mock.jsx";

function encodeVariant(name) {
  let ans = {};
  ans[name] = null;
  return ans;
}

export const CreateRequest = ({ state, createRequest }) => {
  return (
    <div style={{ "font-size": "30px" }}>
      <div style={{ "background-color": "yellow" }}>
        <span>SHIELD USER: CREATE REQUEST</span>
        <span style={{ float: "right" }}>{state.balance} S</span>
      </div>
      <div
        style={{
          margin: "30px",
          display: "grid",
          "grid-template-columns": "200px auto",
        }}
      >
        <div>Request type</div>
        <select
          id="request_type"
          value={state.newRequest.requestType}
          onChange={(ev) =>
            (state.newRequest.requestType = encodeVariant(ev.target.value))
          }
        >
          <option value="grocery">Grocery</option>
          <option value="pharmacy">Pharmacy</option>
        </select>
        <div>Note</div>
        <input
          id="note"
          value={state.newRequest.note}
          onChange={(ev) => (state.newRequest.note = ev.target.value)}
        ></input>
        <div>Items</div>
        <div>
          <ul>
            {new Array(8).fill(null).map((_, index) =>
            <li>
              <input
                value={state.newRequest.items[{index}]}
                onChange={(ev) => (state.newRequest.items[index] = ev.target.value)}
              ></input>
            </li>)}
          </ul>
        </div>
        <div>
          <button onClick={() => createRequest(state.newRequest)}>
            Request!
          </button>
        </div>
      </div>
      <div>{state.errorMessage}</div>
    </div>
  );
};
