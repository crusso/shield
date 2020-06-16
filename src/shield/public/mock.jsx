export function toyRequest() {
  return {
    requestType: "grocery",
    requestLocation: {
      lat: 47.2 + Math.random() / 10,
      lng: 8.6 + Math.random() / 10,
    }, // TODO: Location other than user
    note: "Please choose green bananas",
    items: ["bananas", "latex gloves"],
    reward: 9,
  };
}
