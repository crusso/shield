import shield from "ic:canisters/shield";
import * as React from "react";
import { render } from "react-dom";
import { UserRegistration } from "./user_registration.jsx";
import { UserDashboard } from "./user_dashboard.jsx";
import { HelperRegistration } from "./helper_registration.jsx";
import { HelperDashboard } from "./helper_dashboard.jsx";
import { FrontPage } from "./front_page.jsx";
import * as C from "./const.js";
import { leaflet, mapbox_token } from "./lib/leaflet-src.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "",
      me: {
        user: [],
        helper: [],
      },
      location: { lat: null, lng: null },
      errorMessage: "",
      nearbyHelpers: [],
      nearbyHelperMarkers: [],
      myMap: null,
    };
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
    me.user.forEach((_) => this.navigateTo(C.USER_DASHBOARD));
    me.helper.forEach((_) => this.navigateTo(C.HELPER_DASHBOARD));
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
      this.navigateTo(C.USER_DASHBOARD);
    } catch (e) {
      this.setState({ ...this.state, errorMessage: e.message });
    }
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
    console.log("Finding helpers");
    let nearbyHelpers = await shield.findHelpers();
    console.log({helpers: nearbyHelpers});
    this.setState({...this.state, nearbyHelpers});
  };
  makeMap = async (location) => {
    if (this.state.myMap !== null) return;
    const {lat,lng} = location;
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
    this.setState(...this.state, myMap);
    await this.findHelpers();
    state.nearbyHelperMarkers = state.nearbyHelpers.map(helper => L.marker([helper.location.lat, helper.location.lng]).addTo(mymap));
  };
  render() {
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
        <UserDashboard setGlobalState={this.setState} state={this.state} makeMap={this.makeMap} />
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
        <HelperDashboard setGlobalState={this.setState} state={this.state} />
      );
    } else {
      console.log("Rendering", this.state.view, "as", "FrontPage");
      return <FrontPage navigateTo={this.navigateTo} />;
    }
  }
}

render(<App />, document.getElementById("app"));
