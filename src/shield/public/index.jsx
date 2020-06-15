import shield from "ic:canisters/shield";
import * as React from "react";
import { render } from "react-dom";
import { RequesterRegistration } from "./requester_registration.jsx";
import { RequesterDashboard } from "./requester_dashboard.jsx";
import { HelperRegistration } from "./helper_registration.jsx";
import { FrontPage } from "./front_page.jsx";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "",
      requesterDetails: {
        name: { first: null, last: null },
        email: null,
        address: [],
        age: undefined,
        disability: [],
      },
      errorMessage: "",
    };
    navigator.geolocation.getCurrentPosition((location) => {
      // TODO: Handle user rejection
      const { latitude, longitude } = location.coords;
      this.state.requesterDetails = {
        ...this.state.requesterDetails,
        location: { lat: latitude, lng: longitude },
      };
      console.log(this.state.requesterDetails);
    });
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

  async doGreet() {
    const greeting = await shield.greet(this.state.name);
    this.setState({ ...this.state, message: greeting });
  }

  registerUser = async (state) => {
    this.state.errorMessage = "";
    try {
      const response = await shield.registerUser(this.state.requesterDetails);
      console.log("registerUser", response);
    } catch (e) {
      this.setState({ ...this.state, errorMessage: e.message });
      console.error("XX", e.message);
    }
  };

  onNameChange(ev) {
    this.setState({ ...this.state, name: ev.target.value });
  }

  render() {
    if (this.state.view === "RequesterRegistration") {
      return (
        <RequesterRegistration
          state={this.state}
          setGlobalState={this.setGlobalState}
          registerUser={this.registerUser}
        />
      );
    } else if (this.state.view === "RequesterDashboard") {
      return (
        <RequesterDashboard setGlobalState={this.setState} state={this.state} />
      );
    } else {
      return <FrontPage navigateTo={this.navigateTo} />;
    }
  }
}

render(<App />, document.getElementById("app"));
