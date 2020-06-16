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
import { toyRequest } from "./mock.jsx";

// TODO: Remove:
window.shield = shield;
window.balance = balance;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "", // Which page to display
      me: {
        user: [],
        helper: [],
      },
      location: { lat: null, lng: null },
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

  setGlobalState = (state) => {
    console.log("Set", state);
    this.setState(state);
    console.log("Set state to", state);
  };
  navigateTo = (view) => {
    console.log("Set", view);
    this.setState({ ...this.state, view });
    console.log("Set view to", view);
  };
  async routeUser() {
    const me = await shield.whoAmIAndHowDidIGetHere();
    console.log({ me });
    this.setState({ ...this.state, me });
    me.user.forEach(async (_) => {
      await this.getUserEnvironment();
      this.navigateTo(C.USER_DASHBOARD);
    });
    me.helper.forEach(async (_) => {
      await this.getHelperEnvironment();
      this.navigateTo(C.HELPER_DASHBOARD);
    });
  }
  blankUser = () => ({
    name: { first: null, last: null },
    email: null,
    address: [],
    age: undefined,
    disability: [],
  });
  registerUser = async (user) => {
    this.state.errorMessage = "";
    try {
      user.location = this.state.location;
      const response = await shield.registerUser(user);
      console.log("registerUser", response);
      this.setState({ ...this.state, me: { user: [user], helper: [] } });
      await this.getUserEnvironment();
      this.navigateTo(C.USER_DASHBOARD);
    } catch (e) {
      this.setState({ ...this.state, errorMessage: e.message });
    }
  };
  getUserEnvironment = async () => {
    await this.findHelpers();
    await this.getUserRequests();
    await this.getBalance().catch((e) =>
      console.error("Failed to get balance", e.message)
    );
  };
  getHelperEnvironment = async () => {
    await Promise.all([
      this.getHelperRequests(),
      this.getOpenRequests(),
      this.getBalance().catch((e) =>
        console.error("Failed to get balance:", e.message)
      ),
    ]);
  };
  getBalance = async () => {
    balance
      .checkAccount()
      .then((res) => console.log("Balance:", res))
      .catch(console.error);
    let balance = await balance.checkAccount();
    this.setState({ ...this.state, balance });
  };
  getHelperRequests = async () => {
    let requests = await shield.helperRequests();
    await this.setState({ ...this.state, requests });
  };
  getOpenRequests = async () => {
    let open_requests = await shield.findRequests();
    await this.setState({ ...this.state, open_requests });
  };
  blankHelper = () => ({
    name: { first: null, last: null },
    radiusKm: null,
    email: null,
    services: [],
  });
  registerHelper = async (helper) => {
    this.state.errorMessage = "";
    try {
      helper.location = this.state.location;
      const response = await shield.registerHelper(helper);
      console.log("registerHelper", response);
      this.setState({ ...this.state, me: { user: [], helper: [helper] } });
      await this.getHelperEnvironment();
      this.navigateTo(C.HELPER_DASHBOARD);
    } catch (e) {
      this.setState({ ...this.state, errorMessage: e.message });
    }
  };
  getLocation() {
    return new Promise((yay, nay) => {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log({ location });
        // TODO: Handle user rejection
        const { latitude, longitude } = location.coords;
        location = { lat: latitude, lng: longitude };
        this.state.me.user.forEach((user) => (user.location = location));
        this.state.me.helper.forEach((user) => (user.location = location));
        this.state.location = location;
        console.log(this.state.me);
        yay();
      });
    });
  }
  findHelpers = async () => {
    if (this.state.nearbyHelpers !== null) return;
    console.log("Finding helpers");
    let nearbyHelpers = await shield.findHelpers();
    console.log({ helpers: nearbyHelpers });
    this.setState({ ...this.state, nearbyHelpers });
  };
  makeMap = async (location, markers) => {
    if (this.visuals.myMap) {
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
      console.log("Creating request:", request);
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
      console.log({ requests });
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
      console.log("Rendering", this.state.view, { user });
      return (
        <UserRegistration
          state={this.state}
          user={user}
          registerUser={this.registerUser}
        />
      );
    } else if (this.state.view === C.USER_DASHBOARD) {
      console.log("Rendering", this.state.view);
      this.findHelpers();
      return (
        <UserDashboard
          navigateTo={this.navigateTo}
          state={this.state}
          makeMap={this.makeMap}
          makeMarkers={this.makeMarkers}
        />
      );
    } else if (this.state.view === C.HELPER_REGISTRATION) {
      console.log("Rendering", this.state.view);
      let helper = this.state.me.helper[0]
        ? { ...this.state.me.helper[0] }
        : this.blankHelper();
      console.log(helper);
      return (
        <HelperRegistration
          state={this.state}
          helper={helper}
          registerHelper={this.registerHelper}
        />
      );
    } else if (this.state.view === C.HELPER_DASHBOARD) {
      console.log("Rendering", this.state.view);
      return (
        <HelperDashboard
          makeMap={this.makeMap}
          makeMarkers={this.makeMarkers}
          navigateTo={this.navigateTo}
          state={this.state}
        />
      );
    } else if (this.state.view === C.CREATE_REQUEST) {
      console.log("Rendering", this.state.view);
      return (
        <CreateRequest createRequest={this.createRequest} state={this.state} />
      );
    } else if (this.state.view === C.FIND_REQUEST) {
      console.log("Rendering", this.state.view);
      return <FindRequest state={this.state} />;
    } else {
      console.log("Rendering", this.state.view, "as", "FrontPage");
      return <FrontPage navigateTo={this.navigateTo} />;
    }
  }
}

render(<App />, document.getElementById("app"));
