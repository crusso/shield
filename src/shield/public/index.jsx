import shield from "ic:canisters/shield";
import * as React from "react";
import { render } from "react-dom";
import { UserRegistration } from "./user_registration.jsx";
import { UserDashboard } from "./user_dashboard.jsx";
import { HelperRegistration } from "./helper_registration.jsx";
import { FrontPage } from "./front_page.jsx";
import * as C from "./const.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "",
      me: null,
      requesterDetails: {
        name: { first: null, last: null },
        email: null,
        address: [],
        age: undefined,
        disability: [],
      },
      errorMessage: "",
    };
    // TODO: Move this out into a separate function.
    navigator.geolocation.getCurrentPosition((location) => {
      // TODO: Handle user rejection
      const { latitude, longitude } = location.coords;
      this.state.requesterDetails = {
        ...this.state.requesterDetails,
        location: { lat: latitude, lng: longitude },
      };
      console.log(this.state.requesterDetails);
    });
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
    me.helper.forEach((_) => this.navigateTo(HELPER_DASHBOARD));
  }
  registerUser = async (state) => {
    this.state.errorMessage = "";
    try {
      const response = await shield.registerUser(this.state.requesterDetails);
      console.log("registerUser", response);
      this.navigateTo(C.USER_DASHBOARD);
    } catch (e) {
      this.setState({ ...this.state, errorMessage: e.message });
      console.error("XX", e.message);
    }
  };
  render() {
    if (this.state.view === C.USER_REGISTRATION) {
      console.log("Rendering", this.state.view);
      return (
        <UserRegistration state={this.state} registerUser={this.registerUser} />
      );
    } else if (this.state.view === C.USER_DASHBOARD) {
      console.log("Rendering", this.state.view);
      return (
        <UserDashboard setGlobalState={this.setState} state={this.state} />
      );
    } else {
      console.log("Rendering", this.state.view, "as", "FrontPage");
      return <FrontPage navigateTo={this.navigateTo} />;
    }
  }
}

render(<App />, document.getElementById("app"));
