console.log("Loading user dashboard");

import * as React from "react";
import { leaflet, mapbox_token } from "./lib/leaflet-src.js";

export const UserDashboard = ({ setGlobalState, state }) => {
  after_load(() => {
    var mymap = L.map("mapid").setView([51.505, -0.09], 13);

    window.L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapbox_token,
      }
    ).addTo(mymap);
  });

  console.log("leaflet", leaflet);
  return (
    <div style={{ "font-size": "30px" }}>
      <div style={{ "background-color": "yellow" }}>
        <p>SHIELD USER DASHBOARD</p>
      </div>
      <div
        style={{
          margin: "30px",
          display: "grid",
          "grid-template-columns": "200px auto",
        }}
      >
        <div>Name</div>
        <div id="mapid" style={{ height: "180px" }}></div>
      </div>
      <div></div>
    </div>
  );
};

function after_load(delayed_action) {
  setTimeout(delayed_action, 200); // horrible hack
}
