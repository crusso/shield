import user from 'ic:canisters/user';

user.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
