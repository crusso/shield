import * as React from "react";

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
          onChange={(ev) =>
            (state.newRequest.requestType = encodeVariant(ev.target.value))
          }
        >
          <option value="grocery">Grocery</option>
          <option value="pharmacy">Pharmacy</option>
        </select>
        <div>Items</div>
        <div>
          <ul>
            {new Array(8).fill(null).map((_, index) => (
              <li>
                <input
                  onChange={(ev) =>
                    (state.newRequest.items[index] = ev.target.value)
                  }
                ></input>
              </li>
            ))}
          </ul>
        </div>
        <div>Note</div>
        <input
          id="note"
          onChange={(ev) => (state.newRequest.note = ev.target.value)}
        ></input>
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
