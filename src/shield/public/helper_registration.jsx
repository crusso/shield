const HelperRegistration = ({ setGlobalState, state, registerUser }) => (
  <div style={{ "font-size": "30px" }}>
    <div style={{ "background-color": "yellow" }}>
      <p>SHIELD USER REGISTRATION</p>
    </div>
    <div
      style={{
        margin: "30px",
        display: "grid",
        "grid-template-columns": "200px auto",
      }}
    >
      <div>First Name</div>
      <input
        id="first_name"
        value={state.requesterDetails.name.first}
        onChange={(ev) => (state.requesterDetails.name.first = ev.target.value)}
      ></input>
      <div>Last Name</div>
      <input
        id="last_name"
        value={state.requesterDetails.name.last}
        onChange={(ev) => (state.requesterDetails.name.last = ev.target.value)}
      ></input>
      <div>E-mail</div>
      <input
        id="name"
        typ$Ge="email"
        value={state.requesterDetails.email}
        onChange={(ev) => (state.requesterDetails.email = ev.target.value)}
      ></input>
      <div>Address</div>
      <div>
        <input
          id="address0"
          value={state.requesterDetails.address[0]}
          onChange={(ev) =>
            (state.requesterDetails.address[0] = ev.target.value)
          }
        ></input>
        <input
          id="address1"
          value={state.requesterDetails.address[1]}
          onChange={(ev) =>
            (state.requesterDetails.address[1] = ev.target.value)
          }
        ></input>
        <input
          id="address2"
          value={state.requesterDetails.address[2]}
          onChange={(ev) =>
            (state.requesterDetails.address[2] = ev.target.value)
          }
        ></input>
        <input
          id="address3"
          value={state.requesterDetails.address[3]}
          onChange={(ev) =>
            (state.requesterDetails.address[3] = ev.target.value)
          }
        ></input>
        <input
          id="address4"
          value={state.requesterDetails.address[4]}
          onChange={(ev) =>
            (state.requesterDetails.address[4] = ev.target.value)
          }
        ></input>
      </div>
      <div>Age</div>
      <input
        id="age"
        type="number"
        min="0"
        step="10"
        placeholder="60"
        value={state.requesterDetails.age}
        onChange={(ev) =>
          (state.requesterDetails.age = Number(ev.target.value))
        }
      ></input>
      <div>Disability</div>
      <div>
        <input
          type="radio"
          id="disability-other"
          name="disability"
          value="other"
          onChange={(ev) =>
            (state.requesterDetails.disability = [{ other: null }])
          }
        ></input>
        <label for="disability-other">Other</label>
      </div>
    </div>
    <div>{state.errorMessage}</div>
    <div>
      <button onClick={() => registerUser(state.requesterDetails)}>
        Get Greeting!
      </button>
    </div>
  </div>
);
