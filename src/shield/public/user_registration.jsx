import * as React from "react";

export const UserRegistration = ({ state, user, registerUser }) => (
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
        value={user.name.first}
        onChange={(ev) => (user.name.first = ev.target.value)}
      ></input>
      <div>Last Name</div>
      <input
        id="last_name"
        value={user.name.last}
        onChange={(ev) => (user.name.last = ev.target.value)}
      ></input>
      <div>E-mail</div>
      <input
        id="name"
        type="email"
        value={user.email}
        onChange={(ev) => (user.email = ev.target.value)}
      ></input>
      <div>Address</div>
      <div>
        <input
          id="address0"
          value={user.address[0]}
          onChange={(ev) => (user.address[0] = ev.target.value)}
        ></input>
        <input
          id="address1"
          value={user.address[1]}
          onChange={(ev) => (user.address[1] = ev.target.value)}
        ></input>
        <input
          id="address2"
          value={user.address[2]}
          onChange={(ev) => (user.address[2] = ev.target.value)}
        ></input>
        <input
          id="address3"
          value={user.address[3]}
          onChange={(ev) => (user.address[3] = ev.target.value)}
        ></input>
        <input
          id="address4"
          value={user.address[4]}
          onChange={(ev) => (user.address[4] = ev.target.value)}
        ></input>
      </div>
      <div>Age</div>
      <input
        id="age"
        type="number"
        min="0"
        step="10"
        placeholder="60"
        value="60"
        onChange={(ev) => (user.age = Number(ev.target.value))}
      ></input>
      <div>Disability</div>
      <div>
        {["hearing", "sight", "mobility", "other"].map((disability) => (
          <div>
            <input
              type="radio"
              id={"disability-" + disability}
              name="disability"
              value={disability}
              onChange={(ev) => {
                let variant = {};
                variant[disability] = null;
                user.disability = [variant];
              }}
            ></input>
            <label for={"disability-" + disability}>{disability}</label>
          </div>
        ))}
      </div>
    </div>
    <div>{state.errorMessage}</div>
    <div>
      <button onClick={() => registerUser(user)}>Register!</button>
    </div>
  </div>
);
