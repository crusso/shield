import shield from 'ic:canisters/shield';
import * as React from 'react';
import { render } from 'react-dom';


const FrontPage = ({ navigateTo }) => (
      <div style={{ "font-size": "30px" }}>
        <div style={{ "background-color": "yellow" }}>
          <p>HELLO SHIELD</p>
        </div>
        <div><button onClick={() => navigateTo("RequesterRegistration")}>I need help</button></div>
        <div><button onClick={() => navigateTo("HelperRegistration")}>I want to help!</button></div>
      </div>
    );


const RequesterRegistration = ({ setGlobalState, state, registerUser }) => (
      <div style={{ "font-size": "30px" }}>
        <div style={{ "background-color": "yellow" }}>
          <p>SHIELD USER REGISTRATION</p>
        </div>
        <div style={{ "margin": "30px", "display": "grid", "grid-template-columns": "200px auto" }}>
          <div>First Name</div><input id="first_name" value={state.requesterDetails.name.first} onChange={ev => state.requesterDetails.name.first = ev.target.value}></input>
          <div>Last Name</div><input id="last_name" value={state.requesterDetails.name.last} onChange={ev => state.requesterDetails.name.last = ev.target.value}></input>
          <div>E-mail</div><input id="name" typ$Ge="email" value={state.requesterDetails.email} onChange={ev => state.requesterDetails.email = ev.target.value}></input>
          <div>Address</div><div>
              <input id="address0" value={state.requesterDetails.address[0]} onChange={ev => state.requesterDetails.address[0] = ev.target.value}></input>
              <input id="address1" value={state.requesterDetails.address[1]} onChange={ev => state.requesterDetails.address[1] = ev.target.value}></input>
              <input id="address2" value={state.requesterDetails.address[2]} onChange={ev => state.requesterDetails.address[2] = ev.target.value}></input>
              <input id="address3" value={state.requesterDetails.address[3]} onChange={ev => state.requesterDetails.address[3] = ev.target.value}></input>
              <input id="address4" value={state.requesterDetails.address[4]} onChange={ev => state.requesterDetails.address[4] = ev.target.value}></input>
          </div>
          <div>Age</div><input id="age" type="number" min="0" step="10" placeholder="60" value={state.requesterDetails.age} onChange={ev => state.requesterDetails.age = Number(ev.target.value)}></input>
          <div>Disability</div><div>
            <input type="radio" id="disability-other" name="disability" value="other" onChange={ev => state.requesterDetails.disability = [{"other": null}]}></input>
            <label for="disability-other">Other</label>
          </div>
        </div>
        <div>{state.errorMessage}</div>
        <div><button onClick={() =>  registerUser(state.requesterDetails)}>Get Greeting!</button></div>
      </div>
    );

const RequesterDashboard = ({ setGlobalState, state }) => (
      <div style={{ "font-size": "30px" }}>
        <div style={{ "background-color": "yellow" }}>
          <p>SHIELD USER DASHBOARD</p>
        </div>
        <div style={{ "margin": "30px", "display": "grid", "grid-template-columns": "200px auto" }}>
          <div>Name</div><input id="name" value={state.requesterDetails.name} onChange={ev => state.requesterDetails.name = ev.target.value}></input>
        </div>
        <div><button onClick={() => setGlobalState({...state, view: "RequesterDashboard"})}>Get Greeting!</button></div>
      </div>
    );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        view: '',
        requesterDetails: {name: {first: null, last: null}, email: null, address: [], age:undefined, disability: [] },
        errorMessage: "",
    };
    navigator.geolocation.getCurrentPosition(location => {
        // TODO: Handle user rejection
        const {latitude, longitude} = location.coords;
        this.state.requesterDetails = {...this.state.requesterDetails, location: {lat: latitude, lng: longitude}};
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
    this.setState({...this.state, view});
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
    } catch(e) {
      this.setState({ ...this.state, errorMessage: e.message });
      console.error("XX", e.message);
    }
  };

  onNameChange(ev) {
    this.setState({ ...this.state, name: ev.target.value });
  }

  render() {
    if (this.state.view === 'RequesterRegistration') {
        return <RequesterRegistration state={this.state} setGlobalState={this.setGlobalState} registerUser={this.registerUser} />;
    } else if (this.state.view === 'RequesterDashboard') {
        return <RequesterDashboard setGlobalState={this.setState} state={this.state} />;
    } else {
        return <FrontPage navigateTo={this.navigateTo} />;
    }
  }
}

render(<App />, document.getElementById('app'));
