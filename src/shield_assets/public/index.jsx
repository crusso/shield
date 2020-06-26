import shield from "ic:canisters/shield";
import balance from "ic:canisters/balance";
import * as React from "react";
import { render } from "react-dom";
import { UserRegistration } from "./user_registration.jsx";
import { UserDashboard } from "./user_dashboard.jsx";
import { HelperRegistration } from "./helper_registration.jsx";
import { HelperDashboard } from "./helper_dashboard.jsx";
import { FrontPage } from "./front_page.jsx";
import { CreateRequest } from "./create_request.jsx";
import { FindRequest } from "./find_request.jsx";
import * as C from "./const.js";
import { leaflet, mapbox_token } from "./lib/leaflet-src.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
var link = document.createElement("link");

link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute(
  "href",
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
);
document.head.appendChild(link);

// Enable access to the canister APIs from the console.
// This is much quicker than recompiling the react client, if you want to run some test queries.
window.shield = shield;
window.balance = balance;

const default_location = { lat: 47.371653, lng: 8.512296 };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "", // Which page to display
      me: {
        user: [],
        helper: [],
      },
      location: default_location,
      errorMessage: "",
      nearbyHelpers: null,
      requests: [], // Requests posted or accepted by this user/helper.
      open_requests: [], // Unclaimed requests.
      balance: 0,
      newRequest: this.blankRequest(), // Stash partially completed requests so that the user doesn't have to re-enter details; does not survive the user doing a hard refresh.
    };
    this.visuals = {};
    this.getLocation();
    this.routeUser();
  }
  navigateTo = (view) => {
    this.setState({ ...this.state, view });
  };
  async routeUser() {
    const me = await shield.whoAmIAndHowDidIGetHere();
    this.setState({ ...this.state, me });
    me.user.forEach(async (_) => {
      this.getUserEnvironment();
      this.navigateTo(C.USER_DASHBOARD);
    });
    me.helper.forEach(async (_) => {
      await this.getHelperEnvironment();
      this.navigateTo(C.HELPER_DASHBOARD);
    });
  }
  blankUser = () => ({
    name: { first: "Claudio", last: "Russo" },
    email: "cvr@hotmail.com",
    address: ["Girton"],
    age: 50,
    disability: [{ other: null }],
  });
  registerUser = async (user) => {
    this.state.errorMessage = "";
    try {
      document.body.style.cursor = "wait";
      user.location = this.state.location;
      const response = await shield.registerUser(user);
      this.setState({ ...this.state, me: { user: [user], helper: [] } });
      this.getUserEnvironment();
      this.navigateTo(C.USER_DASHBOARD);
      document.body.style.cursor = "pointer";
    } catch (e) {
      document.body.style.cursor = "pointer";
      this.setState({ ...this.state, errorMessage: e.message });
    }
  };
  getUserEnvironment = async () => {
    await this.getUserEnvironmentOnce();
    if (undefined === this.poll) {
      this.poll = setInterval(() => this.getUserEnvironmentOnce(), 5000);
    }
  };
  getUserEnvironmentOnce = async () => {
    await Promise.all([
      this.findHelpers(),
      this.getUserRequests(),
      this.getBalance(),
    ]);
  };
  getHelperEnvironment = async () => {
    await this.getHelperEnvironmentOnce();
    if (undefined === this.poll) {
      this.poll = setInterval(() => this.getHelperEnvironmentOnce(), 2000);
    }
  };
  getHelperEnvironmentOnce = async () => {
    await Promise.all([
      this.getHelperRequests(),
      this.getOpenRequests(),
      this.getBalance(),
    ]);
  };
  getBalance = async () => {
    try {
      var b = await balance.checkAccount();
      b = Number(b[0]);
      console.log({ balance: b });
      this.setState({ ...this.state, balance: b });
    } catch (e) {
      console.error("Failed to get balance:", e.message);
    }
  };
  getHelperRequests = async () => {
    let requests = await shield.helperRequests();
    await this.setState({ ...this.state, requests });
  };
  getOpenRequests = async () => {
    let open_requests = await shield.findRequests();
    await this.setState({ ...this.state, open_requests });
  };
  acceptRequest = async (request_id) => {
    try {
      document.body.style.cursor = "wait";
      let claim = await shield.acceptRequest(request_id);
    } catch (e) {
      console.log(e.message);
    }
    document.body.style.cursor = "pointer";
    this.getOpenRequests();
    this.getHelperRequests();
  };
  confirmRequest = async (request_id) => {
    try {
      document.body.style.cursor = "wait";
      let claim = await shield.confirmRequest(request_id);
      try {
        var b = await balance.checkAccount();
        b = Number(b[0]);
        console.log({ balance: b });
        this.setState({ ...this.state, balance: b });
      } catch (e) {
        console.error("Failed to get balance:", e.message);
      }
    } catch (e) {
      console.log(e.message);
    }
    document.body.style.cursor = "pointer";
    this.getUserRequests();
  };
  blankHelper = () => ({
    name: { first: "Good", last: "Samaritan" },
    radiusKm: 5,
    email: "goodie@gmail.com",
    services: [{ grocery: null }],
  });
  registerHelper = async (helper) => {
    this.state.errorMessage = "";
    try {
      document.body.style.cursor = "wait";
      helper.location = this.state.location;
      const response = await shield.registerHelper(helper);
      this.setState({ ...this.state, me: { user: [], helper: [helper] } });
      await this.getHelperEnvironment();
      this.navigateTo(C.HELPER_DASHBOARD);
      document.body.style.cursor = "pointer";
    } catch (e) {
      document.body.style.cursor = "pointer";
      this.setState({ ...this.state, errorMessage: e.message });
    }
  };
  getLocation() {
    return new Promise((yay, nay) => {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log({ location });
        // TODO: Handle user rejection
        const { latitude, longitude } = location.coords;
        location =
          latitude !== null && longitude !== null
            ? { lat: latitude, lng: longitude }
            : default_location;
        this.state.me.user.forEach((user) => (user.location = location));
        this.state.me.helper.forEach((user) => (user.location = location));
        this.state.location = location;
        yay();
      });
    });
  }
  findHelpers = async () => {
    if (this.state.nearbyHelpers !== null) return;
    let nearbyHelpers = await shield.findHelpers();
    this.setState({ ...this.state, nearbyHelpers });
  };
  makeMap = async (location, markers) => {
    let mapContainer = document.getElementById("mapid");
    if (!mapContainer) return;
    if (mapContainer.firstChild) {
      console.log("Already have map:", this.visuals.myMap);
    } else {
      try {
        const { lat, lng } = location;
        var myMap = L.map("mapid").setView([lat, lng], 13);

        // Fill in the map:
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
        ).addTo(myMap);
        this.visuals.myMap = myMap;
      } catch (e) {
        console.log("Failed to draw map:", e.message);
      }
    }
    if (markers) this.makeMarkers(markers);
  };
  makeMarkers = (locations) => {
    let myMap = this.visuals.myMap;
    if (!myMap) return console.log("No map");
    if (this.visuals.markers) {
      this.visuals.markers.forEach((marker) => {
        try {
          myMap.removeLayer(marker);
        } catch (e) {
          console.log("Could not remove marker:", marker, e.message);
        }
      });
    }
    try {
      this.visuals.markers = locations.map((location) =>
        L.marker([location.lat, location.lng]).addTo(myMap)
      );
    } catch (e) {
      console.error("Failed to add markers:", e.message);
    }
  };
  blankRequest = () => ({
    requestType: { grocery: null },
    note: "",
    items: [],
    reward: 1,
    location: { lat: null, lng: null },
  });
  createRequest = async (request) => {
    try {
      this.state.errorMessage = "";
      request.requestLocation = this.state.location;
      request.reward = 1; // Fixed reward as a matter of policy but that may change.
      await shield.postRequest(request);
      this.getUserRequests();
      this.setState({ ...this.state, newRequest: this.blankRequest() });
      this.navigateTo(C.USER_DASHBOARD);
    } catch (e) {
      let errorMessage = e.message;
      console.error("Failed to create request:", errorMessage);
      this.setState({ ...this.state, errorMessage });
    }
  };
  getUserRequests = async () => {
    try {
      let requests = await shield.userRequests();
      this.setState({ ...this.state, requests });
    } catch (e) {
      console.error("Failed to get user requests:", e.message);
    }
  };
  render() {
    console.log({ state: this.state });
    if (this.state.view === C.USER_REGISTRATION) {
      let user = this.state.me.user[0]
        ? { ...this.state.me.user[0] }
        : this.blankUser();
      return (
        <UserRegistration
          state={this.state}
          user={user}
          registerUser={this.registerUser}
        />
      );
    } else if (this.state.view === C.USER_DASHBOARD) {
      this.findHelpers();
      return (
        <UserDashboard
          navigateTo={this.navigateTo}
          state={this.state}
          makeMap={this.makeMap}
          makeMarkers={this.makeMarkers}
          confirmRequest={this.confirmRequest}
        />
      );
    } else if (this.state.view === C.HELPER_REGISTRATION) {
      let helper = this.state.me.helper[0]
        ? { ...this.state.me.helper[0] }
        : this.blankHelper();
      return (
        <HelperRegistration
          state={this.state}
          helper={helper}
          registerHelper={this.registerHelper}
        />
      );
    } else if (this.state.view === C.HELPER_DASHBOARD) {
      return (
        <HelperDashboard
          makeMap={this.makeMap}
          makeMarkers={this.makeMarkers}
          navigateTo={this.navigateTo}
          state={this.state}
        />
      );
    } else if (this.state.view === C.CREATE_REQUEST) {
      return (
        <CreateRequest createRequest={this.createRequest} state={this.state} />
      );
    } else if (this.state.view === C.FIND_REQUEST) {
      return (
        <FindRequest
          state={this.state}
          acceptRequest={this.acceptRequest}
          navigateTo={this.navigateTo}
          makeMap={this.makeMap}
          makeMarkers={this.makeMarkers}
        />
      );
    } else {
      return <FrontPage navigateTo={this.navigateTo} />;
    }
  }
}

render(<App />, document.getElementById("app"));
