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
      me: {
        user: [],
        helper: [],
      },
      location: { lat: null, lng: null },
      errorMessage: "",
    };
    // TODO: Move this out into a separate function.
    navigator.geolocation.getCurrentPosition((location) => {
      // TODO: Handle user rejection
      const { latitude, longitude } = location.coords;
      location = { lat: latitude, lng: longitude };
      this.state.me.user.forEach((user) => (user.location = location));
      this.state.me.helper.forEach((user) => (user.location = location));
      this.state.location = location;
      console.log(this.state.me);
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
    radiusKm: 2,
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
      return (
        <UserDashboard setGlobalState={this.setState} state={this.state} />
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
