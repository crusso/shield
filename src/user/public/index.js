import user from 'ic:canisters/user';

user.start(window.prompt("Enter user number to start:")).then( ack => {
  window.alert("done");
});
