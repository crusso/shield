import * as React from "react";
import * as C from "./const.js";

export const FrontPage = ({ navigateTo }) => (
  <div style={{ "font-size": "30px" }}>
    <div class="title">
      <p>HELLO SHIELD</p>
    </div>
    <div
      style={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: "auto auto",
      }}
    >
      <div>
        <button class="user" onClick={() => navigateTo(C.USER_REGISTRATION)}>
          I need help
        </button>
      </div>
      <div>
        <button
          class="helper"
          onClick={() => navigateTo(C.HELPER_REGISTRATION)}
        >
          I want to help!
        </button>
      </div>
    </div>
  </div>
);
