import * as React from "react";

export const FrontPage = ({ navigateTo }) => (
  <div style={{ "font-size": "30px" }}>
    <div style={{ "background-color": "yellow" }}>
      <p>HELLO SHIELD</p>
    </div>
    <div>
      <button onClick={() => navigateTo("RequesterRegistration")}>
        I need help
      </button>
    </div>
    <div>
      <button onClick={() => navigateTo("HelperRegistration")}>
        I want to help!
      </button>
    </div>
  </div>
);
