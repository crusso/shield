import * as React from "react";

export const HelperRegistration = ({ state, helper, registerHelper }) => {
  // Services is an array; this adds and removes entries to match checkbox updates.
  const setService = (event) => {
    helper.services = helper.services.filter(
      (name) => name != event.target.name
    );
    if (event.target.checked) helper.services.push(event.target.name);
    console.log(helper.services, {
      value: event.target.value,
      checked: event.target.checked,
    });
  };
  return (
    <div style={{ "font-size": "30px" }} class="helper">
      <div class="title">
        <p>SHIELD HELPER REGISTRATION</p>
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
          value={helper.name.first}
          onChange={(ev) => (helper.name.first = ev.target.value)}
        ></input>
        <div>Last Name</div>
        <input
          id="last_name"
          value={helper.name.last}
          onChange={(ev) => (helper.name.last = ev.target.value)}
        ></input>
        <div>E-mail</div>
        <input
          id="name"
          type="email"
          value={helper.email}
          onChange={(ev) => (helper.email = ev.target.value)}
        ></input>
        <div>radius (Km)</div>
        <input
          id="name"
          type="number"
          min="{1}"
          placeholder="10"
          value={helper.radiusKm}
          onChange={(ev) => (helper.radiusKm = Number(ev.target.value))}
        ></input>
        <div>Request type</div>
        <div>
          <input
            type="checkbox"
            id="service-grocery"
            name="grocery"
            value="grocery"
            onChange={(ev) => setService(ev)}
            checked
          ></input>
          <label for="disability-other">Grocery</label>
          <input
            type="checkbox"
            id="service-pharmacy"
            name="pharmacy"
            value="pharmacy"
            onChange={(ev) => setService(ev)}
            checked
          ></input>
          <label for="disability-other">Pharmacy</label>
        </div>
      </div>
      <div>{state.errorMessage}</div>
      <div>
        <button onClick={() => registerHelper(helper)}>Register!</button>
      </div>
    </div>
  );
};
