import * as React from "react";
import * as C from "./const.js";

export const FrontPage = ({ navigateTo }) => (
  <div style={{ "font-size": "30px" }}>
    <div style={{ "background-color": "yellow" }}>
      <p>HELLO SHIELD</p>
    </div>
    <div>
      <button onClick={() => navigateTo(C.USER_REGISTRATION)}>
        I need help
      </button>
    </div>
    <div>
      <button onClick={() => navigateTo(C.HELPER_REGISTRATION)}>
        I want to help!
      </button>
    </div>
  </div>
);
