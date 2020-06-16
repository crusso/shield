export function toyRequest() {
  return {
    requestType: "grocery",
    requestLocation: { lat: 0, lng: 0 }, // TODO: Location other than user
    note: "Please choose green bananas",
    items: ["bananas", "latex gloves"],
    reward: 9,
  };
}
